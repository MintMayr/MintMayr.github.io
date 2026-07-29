import { type GraphEdge, type GraphNode } from '@/types/types'
import { reactive } from 'vue'
import { loadRdfGraph } from './useRdfStore'

const VIEW_CENTER_X = 400
const VIEW_CENTER_Y = 300

function node(id: string, label: string, primaryParent: string | null, visible = false): GraphNode {
  return {
    id,
    label,
    primaryParent,
    x: 0,
    y: 0,
    angle: 0,
    wedgeStart: 0,
    wedgeEnd: Math.PI * 2,
    visible,
    pinned: primaryParent === null,
  }
}

function buildMockData(nodes: GraphNode[], edges: GraphEdge[]) {
  nodes.push(
    node('michael', 'Michael', null, true),
    node('tuwien', 'TU Wien', 'michael'),
    node('siemens', 'Siemens Mobility', 'michael'),
    node('se-masters', 'SE Masters', 'tuwien'),
    node('cybersecurity', 'Cybersecurity', 'tuwien'),
    node('metro-project', 'Metro Project', 'siemens'),
  )
  nodes[0].x = 400
  nodes[0].y = 300
  edges.push(
    { id: 'e1', source: 'michael', target: 'tuwien', label: 'studies' },
    { id: 'e2', source: 'michael', target: 'siemens', label: 'worksAt' },
    { id: 'e3', source: 'tuwien', target: 'se-masters', label: 'program' },
    { id: 'e4', source: 'tuwien', target: 'cybersecurity', label: 'focus' },
    { id: 'e5', source: 'siemens', target: 'metro-project', label: 'contributesTo' },
  )
}

function centerRoot(nodes: GraphNode[]) {
  const root = nodes.find((n) => n.primaryParent === null)
  if (root) {
    root.x = VIEW_CENTER_X
    root.y = VIEW_CENTER_Y
  }
}

async function buildRdfData(nodes: GraphNode[], edges: GraphEdge[]) {
  const { nodes: loadedNodes, edges: loadedEdges } = await loadRdfGraph(
    '/data/cv.ttl',
    'http://example.org/cv#me',
  )
  nodes.push(...loadedNodes)
  edges.push(...loadedEdges)
  centerRoot(nodes)
}

export function useGraphData() {
  const nodes = reactive<GraphNode[]>([])
  const edges = reactive<GraphEdge[]>([])

  const ready = buildRdfData(nodes, edges)
  return { nodes, edges, ready }
}
