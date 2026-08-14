import { type GraphEdge, type GraphNode } from '@/types/types'
import { reactive } from 'vue'
import { loadRdfGraph } from './useRdfStore'

const VIEW_CENTER_X = 400
const VIEW_CENTER_Y = 300

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

  const ready = buildRdfData(nodes, edges).catch((err) => {
    console.error('Failed to load graph data:', err)
  })
  return { nodes, edges, ready }
}
