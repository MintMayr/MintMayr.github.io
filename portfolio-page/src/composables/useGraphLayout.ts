import type { GraphNode } from '@/types/types'

const RING_SPACING = 140

function buildChildrenMap(nodes: GraphNode[]): Map<string, GraphNode[]> {
  const map = new Map<string, GraphNode[]>()
  for (const n of nodes) {
    if (n.primaryParent === null) continue
    const siblings = map.get(n.primaryParent) ?? []
    siblings.push(n)
    map.set(n.primaryParent, siblings)
  }
  return map
}

function layoutChildren(
  parent: GraphNode,
  childrenMap: Map<string, GraphNode[]>,
  ringSpacing: number,
) {
  const children = childrenMap.get(parent.id)
  if (!children || children.length === 0) return

  const wedgeSize = (parent.wedgeEnd - parent.wedgeStart) / children.length

  children.forEach((child, index) => {
    child.wedgeStart = parent.wedgeStart + index * wedgeSize
    child.wedgeEnd = child.wedgeStart + wedgeSize
    child.angle = (child.wedgeStart + child.wedgeEnd) / 2

    if (!child.pinned) {
      child.x = parent.x + ringSpacing * Math.cos(child.angle)
      child.y = parent.y + ringSpacing * Math.sin(child.angle)
    }

    layoutChildren(child, childrenMap, ringSpacing)
  })
}

export function computeLayout(nodes: GraphNode[], ringSpacing = RING_SPACING) {
  const root = nodes.find((n) => n.primaryParent === null)
  if (!root) return
  layoutChildren(root, buildChildrenMap(nodes), ringSpacing)
}

export function buildNodeChildrenMap(nodes: GraphNode[]) {
  return buildChildrenMap(nodes)
}
