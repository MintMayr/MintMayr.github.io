import { type GraphEdge, type GraphNode } from '@/types/types'
import { reactive } from 'vue'

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

export function useGraphData() {
  const nodes = reactive<GraphNode[]>([
    node('michael', 'Michael', null, true),
    node('tuwien', 'TU Wien', 'michael'),
    node('siemens', 'Siemens Mobility', 'michael'),
    node('se-masters', 'SE Masters', 'tuwien'),
    node('cybersecurity', 'Cybersecurity', 'tuwien'),
    node('metro-project', 'Metro Project', 'siemens'),
  ])

  nodes[0].x = 400
  nodes[0].y = 300

  const edges = reactive<GraphEdge[]>([
    { id: 'e1', source: 'michael', target: 'tuwien', label: 'studies' },
    { id: 'e2', source: 'michael', target: 'siemens', label: 'worksAt' },
    { id: 'e3', source: 'tuwien', target: 'se-masters', label: 'program' },
    { id: 'e4', source: 'tuwien', target: 'cybersecurity', label: 'focus' },
    { id: 'e5', source: 'siemens', target: 'metro-project', label: 'contributesTo' },
  ])
  return { nodes, edges }
}
