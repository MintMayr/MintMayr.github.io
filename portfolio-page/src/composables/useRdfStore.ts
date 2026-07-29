import type { GraphEdge, GraphNode } from '@/types/types'
import { Parser, Store, type Quad } from 'n3'

const RDF_TYPE = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type'
const LABEL_PREDICATES = [
  'http://www.w3.org/2000/01/rdf-schema#label',
  'http://www.w3.org/2004/02/skos/core#prefLabel',
  'http://schema.org/name',
]

const FIRST_NAME_PREDICATE = 'http://xmlns.com/foaf/0.1/firstName'
const LAST_NAME_PREDICATE = 'http://xmlns.com/foaf/0.1/lastName'
const DESCRIPTION_PREDICATE = 'http://schema.org/description'
const EXCLUDED_PREDICATES = new Set([RDF_TYPE])

function localName(uri: string): string {
  const separatorIndex = Math.max(uri.lastIndexOf('#'), uri.lastIndexOf('/'))
  return separatorIndex === -1 ? uri : uri.slice(separatorIndex + 1)
}

function literalFor(uri: string, predicate: string, quads: Quad[]): string | undefined {
  const match = quads.find(
    (q) =>
      q.subject.value === uri && q.predicate.value === predicate && q.object.termType === 'Literal',
  )
  const value = match?.object.value
  return value && value.trim().length > 0 ? value : undefined
}

function labelFor(uri: string, quads: Quad[]): string {
  for (const predicate of LABEL_PREDICATES) {
    const value = literalFor(uri, predicate, quads)
    if (value) return value
  }
  const firstName = literalFor(uri, FIRST_NAME_PREDICATE, quads)
  const lastName = literalFor(uri, LAST_NAME_PREDICATE, quads)

  if (firstName || lastName) return [firstName, lastName].filter(Boolean).join(' ')
  return localName(uri)
}

function makeNode(uri: string, primaryParent: string | null, quads: Quad[]): GraphNode {
  return {
    id: uri,
    label: labelFor(uri, quads),
    description: literalFor(uri, DESCRIPTION_PREDICATE, quads),
    primaryParent,
    x: 0,
    y: 0,
    angle: 0,
    wedgeStart: 0,
    wedgeEnd: Math.PI * 2,
    visible: primaryParent === null,
    pinned: primaryParent === null,
  }
}

export function buildGraphFromQuads(
  quads: Quad[],
  rootUri: string,
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodesByUri = new Map<string, GraphNode>()
  const quadsBySubject = new Map<string, Quad[]>()

  for (const quad of quads) {
    const list = quadsBySubject.get(quad.subject.value) ?? []
    list.push(quad)
    quadsBySubject.set(quad.subject.value, list)
  }

  nodesByUri.set(rootUri, makeNode(rootUri, null, quads))
  const queue: string[] = [rootUri]

  while (queue.length > 0) {
    const currentUri = queue.shift()!
    const outgoing = quadsBySubject.get(currentUri) ?? []

    for (const quad of outgoing) {
      if (EXCLUDED_PREDICATES.has(quad.predicate.value)) continue
      if (quad.object.termType !== 'NamedNode') continue
      const objectUri = quad.object.value
      if (nodesByUri.has(objectUri)) continue

      nodesByUri.set(objectUri, makeNode(objectUri, currentUri, quads))
      queue.push(objectUri)
    }
  }

  const edges: GraphEdge[] = []
  for (const quad of quads) {
    if (EXCLUDED_PREDICATES.has(quad.predicate.value)) continue
    if (quad.object.termType !== 'NamedNode') continue
    if (!nodesByUri.has(quad.subject.value) || !nodesByUri.has(quad.object.value)) continue
    edges.push({
      id: `${quad.subject.value}|${quad.predicate.value}|${quad.object.value}`,
      source: quad.subject.value,
      target: quad.object.value,
      label: localName(quad.predicate.value),
    })
  }

  return { nodes: [...nodesByUri.values()], edges }
}

export async function loadRdfGraph(
  path: string,
  rootUri: string,
): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
  const { load, getAll } = useRdfStore()
  await load(path)
  const quads = getAll()
  if (!quads.some((q) => q.subject.value === rootUri)) {
    console.warn(`loadRdfGraph: rootUri "${rootUri}" matches no subject in the loaded data.`)
  }
  return buildGraphFromQuads(quads, rootUri)
}

export function useRdfStore() {
  const store = new Store()

  async function load(path: string) {
    const response = await fetch(path)
    const turtle = await response.text()
    const parser = new Parser()
    const quads = parser.parse(turtle)
    store.addQuads(quads)
  }

  function getAll(): Quad[] {
    return store.getQuads(null, null, null, null)
  }

  function getBySubject(uri: string): Quad[] {
    return store.getQuads(uri, null, null, null)
  }

  function getByPredicate(uri: string): Quad[] {
    return store.getQuads(null, uri, null, null)
  }

  function getByType(typeUri: string): Quad[] {
    return store.getQuads(null, 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type', typeUri, null)
  }

  function getSubjects(): string[] {
    return [...new Set(store.getQuads(null, null, null, null).map((q) => q.subject.value))]
  }
  return { store, load, getAll, getBySubject, getByPredicate, getByType, getSubjects }
}
