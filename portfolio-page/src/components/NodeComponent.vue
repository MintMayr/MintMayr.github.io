<script setup lang="ts">
import type { GraphNode } from '@/types/types.ts'
import { computed } from 'vue'

const props = defineProps<{
  node: GraphNode
  hiddenChildren: GraphNode[]
  hasVisibleChildren: boolean
  isDragging: boolean
}>()

const emit = defineEmits<{
  drag: [nodeId: string, x: number, y: number]
  dragstart: []
  dragend: []
  reveal: [childId: string]
  collapse: [nodeId: string]
  collapseSelf: [nodeId: string]
  hoverstart: [nodeId: string]
  hoverend: [nodeId: string]
}>()

const RADIUS = 32
const LABEL_FONT_SIZE = 12
const LABEL_LINE_HEIGHT = 13
const LABEL_MAX_LINES = 2
const LABEL_MAX_WIDTH = 2 * (RADIUS - 10)

const clipId = computed(() => `node-clip-${props.node.id.replace(/[^a-zA-Z0-9_-]/g, '_')}`)

function wrapLabel(
  text: string,
  maxWidthPx: number,
  fontSizePx: number,
  maxLines: number,
): string[] {
  const avgCharWidth = fontSizePx * 0.6
  const maxChars = Math.max(1, Math.floor(maxWidthPx / avgCharWidth))
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars || !current) {
      current = candidate
    } else {
      lines.push(current)
      current = word
    }
    if (lines.length === maxLines) break
  }
  if (lines.length < maxLines) lines.push(current)
  lines.length = Math.min(lines.length, maxLines)

  const fullyConsumed = lines.join(' ').length >= text.length
  if (!fullyConsumed) {
    const lastIndex = lines.length - 1
    lines[lastIndex] = `${lines[lastIndex]?.slice(0, Math.max(0, maxChars - 1))}...`
  }
  return lines
}

const labelLines = computed(() =>
  wrapLabel(props.node.label, LABEL_MAX_WIDTH, LABEL_FONT_SIZE, LABEL_MAX_LINES),
)
const firstLineDy = computed(() => -(LABEL_LINE_HEIGHT * (labelLines.value.length - 1)) / 2)

function toSvgPoint(event: PointerEvent): { x: number; y: number } | null {
  const target = event.currentTarget as SVGGraphicsElement
  const svg = target.ownerSVGElement
  const ctm = svg?.getScreenCTM()
  if (!svg || !ctm) return null

  const point = svg.createSVGPoint()
  point.x = event.clientX
  point.y = event.clientY
  const transformed = point.matrixTransform(ctm.inverse())
  return { x: transformed.x, y: transformed.y }
}

function onPointerDown(event: PointerEvent) {
  ;(event.currentTarget as Element).setPointerCapture(event.pointerId)
  emit('dragstart')
}

function onPointerMove(event: PointerEvent) {
  if (!(event.buttons & 1)) return
  const point = toSvgPoint(event)
  if (!point) return
  emit('drag', props.node.id, point.x, point.y)
}

function onPointerUp() {
  emit('dragend')
}
</script>

<template>
  <g
    :style="{
      transform: `translate(${node.x}px, ${node.y}px)`,
      transition: isDragging ? 'none' : 'transform 300ms ease-out',
    }"
    class="cursor-grab"
    @pointerdown.stop="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerUp"
    @pointerenter="emit('hoverstart', node.id)"
    @pointerleave="emit('hoverend', node.id)"
  >
    <title>{{ node.label }}</title>
    <defs>
      <clipPath :id="clipId">
        <circle :r="RADIUS" />
      </clipPath>
    </defs>

    <circle
      :r="RADIUS"
      class="fill-white dark:fill-slate-800 stroke-amber-500 stroke-2 hover:stroke-amber-400"
    />
    <text
      text-anchor="middle"
      dominant-baseline="middle"
      :clip-path="`url(#${clipId})`"
      :style="{ fontSize: `${LABEL_FONT_SIZE}px` }"
      class="fill-slate-800 dark:fill-slate-100 select-none pointer-events-none"
    >
      <tspan
        v-for="(line, index) in labelLines"
        :key="index"
        x="0"
        :dy="index === 0 ? firstLineDy : LABEL_LINE_HEIGHT"
        >{{ line }}</tspan
      >
    </text>

    <g
      v-if="hasVisibleChildren"
      :transform="`translate(${RADIUS - 6}, ${-RADIUS + 6})`"
      class="cursor-pointer"
      @pointerdown.stop
      @pointermove.stop
      @click="emit('collapse', node.id)"
    >
      <circle r="9" class="fill-slate-300 dark:fill-slate-600" />
      <text text-anchor="middle" dominant-baseline="middle" class="text-[11px] select-none">-</text>
    </g>
    <g
      v-if="node.primaryParent !== null"
      :transform="`translate(${-RADIUS + 6}, ${-RADIUS + 6})`"
      class="cursor-pointer"
      @pointerdown.stop
      @pointermove.stop
      @click="emit('collapseSelf', node.id)"
    >
      <circle r="9" class="fill-slate-300 dark:fill-slate-600" />
      <text text-anchor="middle" dominant-baseline="middle" class="text-[11px] select-none">x</text>
    </g>
    <g v-for="child in hiddenChildren" :key="child.id">
      <line
        :x1="0.3 * (child.x - node.x)"
        :y1="0.3 * (child.y - node.y)"
        :x2="0.55 * (child.x - node.x)"
        :y2="0.55 * (child.y - node.y)"
        class="stroke-slate-300 dark:stroke-slate-600"
        stroke-width="1.5"
        stroke-dasharray="3 3"
      />
      <g
        :transform="`translate(${0.55 * (child.x - node.x)}, ${0.55 * (child.y - node.y)})`"
        class="cursor-pointer"
        @pointerdown.stop
        @pointermove.stop
        @click="emit('reveal', child.id)"
      >
        <circle r="9" class="fill-amber-500" />
        <text
          text-anchor="middle"
          dominant-baseline="middle"
          class="fill-white text-[11px] select-none"
          >+</text
        >
      </g>
    </g>
  </g>
</template>
