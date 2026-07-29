<script setup lang="ts">
import type { GraphNode } from '@/types/types.ts'
import NodeComponent from './NodeComponent.vue'
import { useGraphData } from '@/composables/useGraphData.ts'
import { computed, onMounted, reactive, ref } from 'vue'
import { buildNodeChildrenMap, computeLayout } from '@/composables/useGraphLayout.ts'

const MIN_SCALE = 0.3
const MAX_SCALE = 3
const VIEW_WIDTH = 800
const VIEW_HEIGHT = 600

const viewBox = reactive({ x: 0, y: 0, width: VIEW_WIDTH, height: VIEW_HEIGHT })

const { nodes, edges, ready } = useGraphData()

const nodesById = computed(() => new Map(nodes.map((n) => [n.id, n])))
const childrenMap = computed(() => buildNodeChildrenMap(nodes))
const visibleNodes = computed(() => nodes.filter((n) => n.visible))

const isDragging = ref(false)

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

function onWheel(event: WheelEvent) {
  const svg = event.currentTarget as SVGSVGElement
  const ctm = svg.getScreenCTM()
  if (!ctm) return

  const point = svg.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  const cursor = point.matrixTransform(ctm.inverse())

  const zoomFactor = event.deltaY < 0 ? 0.99 : 1.05
  const nextWidth = viewBox.width * zoomFactor
  const scale = VIEW_WIDTH / nextWidth
  if (scale < MIN_SCALE || scale > MAX_SCALE) return
  viewBox.x = cursor.x - (cursor.x - viewBox.x) * zoomFactor
  viewBox.y = cursor.y - (cursor.y - viewBox.y) * zoomFactor
  viewBox.width = nextWidth
  viewBox.height = viewBox.height * zoomFactor
}

function onDragStart() {
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
}

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

let rafId: number | null = null
let pendingDrag: { nodeId: string; x: number; y: number } | null = null

function onDrag(nodeId: string, x: number, y: number) {
  pendingDrag = { nodeId, x, y }
  if (rafId !== null) return
  rafId = requestAnimationFrame(() => {
    rafId = null
    if (!pendingDrag) return
    const dragged = nodesById.value.get(pendingDrag.nodeId)
    if (dragged) {
      dragged.pinned = true
      dragged.x = pendingDrag.x
      dragged.y = pendingDrag.y
      relayout()
    }
  })
}

onMounted(async () => {
  await ready
  relayout()
})
</script>

<template>
  <svg
    :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`"
    class="w-full h-auto border-2 border-solid border-amber-500"
    @wheel.prevent="onWheel"
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
      :is-dragging="isDragging"
      @drag="onDrag"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
      @reveal="onReveal"
      @collapse="onCollapse"
    />
  </svg>
</template>
