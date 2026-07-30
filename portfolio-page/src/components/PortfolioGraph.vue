<script setup lang="ts">
import type { GraphNode } from '@/types/types.ts'
import NodeComponent from './NodeComponent.vue'
import { useGraphData } from '@/composables/useGraphData.ts'
import { computed, onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import { buildNodeChildrenMap, computeLayout } from '@/composables/useGraphLayout.ts'

const MIN_SCALE = 0.3
const MAX_SCALE = 3
const VIEW_WIDTH = 800
const VIEW_HEIGHT = 600
const ZOOM_SENSITIVITY = 0.0015
const MAX_WHEEL_DELTA = 100

const viewBox = reactive({ x: 0, y: 0, width: VIEW_WIDTH, height: VIEW_HEIGHT })

const { nodes, edges, ready } = useGraphData()

const nodesById = computed(() => new Map(nodes.map((n) => [n.id, n])))
const childrenMap = computed(() => buildNodeChildrenMap(nodes))
const visibleNodes = computed(() => nodes.filter((n) => n.visible))

const isDragging = ref(false)
let rafId: number | null = null
let pendingDrag: { nodeId: string; x: number; y: number } | null = null

function onDragStart() {
  isDragging.value = true
}

function onDragEnd() {
  isDragging.value = false
}

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

  const clampedDeltaY = Math.max(-MAX_WHEEL_DELTA, Math.min(MAX_WHEEL_DELTA, event.deltaY))
  const zoomFactor = Math.exp(clampedDeltaY * ZOOM_SENSITIVITY)

  const nextWidth = viewBox.width * zoomFactor
  const scale = VIEW_WIDTH / nextWidth
  if (scale < MIN_SCALE || scale > MAX_SCALE) return

  viewBox.x = cursor.x - (cursor.x - viewBox.x) * zoomFactor
  viewBox.y = cursor.y - (cursor.y - viewBox.y) * zoomFactor
  viewBox.width = nextWidth
  viewBox.height = viewBox.height * zoomFactor
}

const isPanning = ref(false)
let panStartClient = { x: 0, y: 0 }
let panStartViewBox = { x: 0, y: 0 }

function onBackgroundPointerDown(event: PointerEvent) {
  const svg = event.currentTarget as SVGSVGElement
  svg.setPointerCapture(event.pointerId)
  isPanning.value = true
  panStartClient = { x: event.clientX, y: event.clientY }
  panStartViewBox = { x: viewBox.x, y: viewBox.y }
}

function onBackgroundPointerMove(event: PointerEvent) {
  if (!isPanning.value) return
  const svg = event.currentTarget as SVGSVGElement
  const screenToViewBoxScale = viewBox.width / svg.clientWidth
  const dx = (event.clientX - panStartClient.x) * screenToViewBoxScale
  const dy = (event.clientY - panStartClient.y) * screenToViewBoxScale
  viewBox.x = panStartViewBox.x - dx
  viewBox.y = panStartViewBox.y - dy
}

function onBackgroundPointerUp() {
  isPanning.value = false
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

function onCollapseSelf(nodeId: string) {
  const node = nodesById.value.get(nodeId)
  if (!node) return
  hideRecursively(node)
  relayout()
}

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
    pendingDrag = null
  })
}

onMounted(async () => {
  await ready
  relayout()
})

onBeforeUnmount(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <svg
    :viewBox="`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`"
    class="w-full h-auto border-2 border-solid border-amber-500"
    @wheel.prevent="onWheel"
    @pointerdown="onBackgroundPointerDown"
    @pointermove="onBackgroundPointerMove"
    @pointerup="onBackgroundPointerUp"
    @pointercancel="onBackgroundPointerUp"
  >
    <rect x="-5000" y="-5000" width="10000" height="10000" fill="transparent" />
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
          class="fill-slate-500 dark:fill-slate-300 text-[11px] select-none"
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
      @collapse-self="onCollapseSelf"
    />
  </svg>
</template>
