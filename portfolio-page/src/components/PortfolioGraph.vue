<script setup lang="ts">
import type { GraphNode } from '@/types/types.ts'
import NodeComponent from './NodeComponent.vue'
import { useGraphData } from '@/composables/useGraphData.ts'
import { computed, onMounted } from 'vue'
import { buildNodeChildrenMap, computeLayout } from '@/composables/useGraphLayout.ts'

const VIEW_WIDTH = 800
const VIEW_HEIGHT = 600
const { nodes, edges } = useGraphData()

const nodesById = computed(() => new Map(nodes.map((n) => [n.id, n])))
const childrenMap = computed(() => buildNodeChildrenMap(nodes))
const visibleNodes = computed(() => nodes.filter((n) => n.visible))

const visibleEdges = computed(() => {
  const result: { id: string; label: string; source: GraphNode; target: GraphNode }[] = []
  for (const edge of edges) {
    const source = nodesById.value.get(edge.source)
    const target = nodesById.value.get(edge.target)

    if (source?.visible && target?.visible) {
      result.push({ id: edge.id, label: edge.label, source, target })
    }
  }
  return result
})

function hiddenChildrenOf(nodeId: string): GraphNode[] {
  return (childrenMap.value.get(nodeId) ?? []).filter((c) => !c.visible)
}

function hasVisibleChildren(nodeId: string): boolean {
  return (childrenMap.value.get(nodeId) ?? []).some((c) => c.visible)
}

function relayout() {
  computeLayout(nodes)
}

function onReveal(childId: string) {
  const child = nodesById.value.get(childId)
  if (!child) return
  child.visible = true
  relayout()
}

function hideRecursively(current: GraphNode) {
  current.visible = false
  current.pinned = false
  for (const child of childrenMap.value.get(current.id) ?? []) {
    hideRecursively(child)
  }
}

function onCollapse(nodeId: string) {
  for (const child of childrenMap.value.get(nodeId) ?? []) {
    hideRecursively(child)
  }
  relayout()
}

function onDrag(nodeId: string, x: number, y: number) {
  const dragged = nodesById.value.get(nodeId)
  if (!dragged) return
  dragged.pinned = true
  dragged.x = x
  dragged.y = y
  relayout()
}

onMounted(relayout)
</script>

<template>
  <svg
    :viewBox="`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`"
    class="w-full h-auto border-2 border-solid border-amber-500"
  >
    <g>
      <g v-for="edge in visibleEdges" :key="edge.id">
        <line
          :x1="edge.source.x"
          :y1="edge.source.y"
          :x2="edge.target.x"
          :y2="edge.target.y"
          class="stroke-slate-400 dark:stroke-slate-500"
          stroke-width="1.5"
        />
        <text
          :x="(edge.source.x + edge.target.x) / 2"
          :y="(edge.source.y + edge.target.y) / 2"
          text-anchor="middle"
          class="fill-slate-500 dark:dill-slate-300 text-[11px] select-none"
        >
          {{ edge.label }}
        </text>
      </g>
    </g>
    <NodeComponent
      v-for="node in visibleNodes"
      :key="node.id"
      :node="node"
      :hidden-children="hiddenChildrenOf(node.id)"
      :has-visible-children="hasVisibleChildren(node.id)"
      @drag="onDrag"
      @reveal="onReveal"
      @collapse="onCollapse"
    />
  </svg>
</template>
