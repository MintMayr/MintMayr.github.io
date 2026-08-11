import type { GraphNode } from '@/types/types'

const RING_SPACING = 140
export const NODE_RADIUS = 32
const SEPARATION_GAP = 8
const MIN_NODE_DISTANCE = NODE_RADIUS * 2 + SEPARATION_GAP

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

export function separateNodes(nodes: GraphNode[], iterations = 4) {
  const visible = nodes.filter((n) => n.visible)

  for (let iter = 0; iter < iterations; iter++) {
    for (let i = 0; i < visible.length; i++) {
      const a = visible[i]
      if (!a) continue
      for (let j = i + 1; j < visible.length; j++) {
        const b = visible[j]
        if (!b) continue
        const dx = b.x - a.x
        const dy = b.y - a.y
        const dist = Math.hypot(dx, dy)
        if (dist >= MIN_NODE_DISTANCE || dist < 0.0001) continue

        const overlap = MIN_NODE_DISTANCE - dist
        const nx = dx / dist
        const ny = dy / dist

        if (!a.pinned && !b.pinned) {
          a.x -= (nx * overlap) / 2
          a.y -= (ny * overlap) / 2
          b.x += (nx * overlap) / 2
          b.y += (ny * overlap) / 2
        } else if (!a.pinned) {
          a.x -= nx * overlap
          a.y -= ny * overlap
        } else if (!b.pinned) {
          b.x += nx * overlap
          b.y += ny * overlap
        }
      }
    }
  }
}
