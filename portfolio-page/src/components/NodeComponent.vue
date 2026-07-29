<script setup lang="ts">
import type { GraphNode } from '@/types/types.ts'

const props = defineProps<{
  node: GraphNode
  hiddenChildren: GraphNode[]
  hasVisibleChildren: boolean
}>()

const emit = defineEmits<{
  drag: [nodeId: string, x: number, y: number]
  reveal: [childId: string]
  collapse: [nodeId: string]
}>()

const RADIUS = 32

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
}

function onPointerMove(event: PointerEvent) {
  if (!(event.buttons & 1)) return
  const point = toSvgPoint(event)
  if (!point) return
  emit('drag', props.node.id, point.x, point.y)
}
</script>

<template>
  <g
    :style="{ transform: `translate(${node.x}px, ${node.y}px)` }"
    class="transition-transform duration-300 ease-out cursor-grab"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
  >
    <title>{{ node.description ?? node.label }}</title>
    <circle
      :r="RADIUS"
      class="fill-white dark:fill-slate-800 stroke-amber-500 stroke-2 hover:stroke-amber-400"
    />
    <text
      text-anchor="middle"
      dominant-baseline="middle"
      class="fill-slate-800 dark:fill-slate-100 text-[12px] select-none pointer-events-none"
    >
      {{ node.label }}
    </text>
    <g
      v-if="hasVisibleChildren"
      :transform="`translate(${RADIUS - 6}, ${-RADIUS + 6})`"
      class="cursor-pointer"
      @pointerdown.stop
      @click="emit('collapse', node.id)"
    >
      <circle r="9" class="fill-slate-300 dark:fill-slate-600" />
      <text text-anchor="middle" dominant-baseline="middle" class="text-[11px] select-none">-</text>
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
