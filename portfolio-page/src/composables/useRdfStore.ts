import { Parser, Store, type Quad } from 'n3'

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
