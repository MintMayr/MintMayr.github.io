import type { Component } from 'vue'

export type TagColor =
  | 'blue'
  | 'teal'
  | 'yellow'
  | 'red'
  | 'green'
  | 'gray'
  | 'violet'
  | 'brown'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'orange'
  | 'cyan'
  | 'emerald'
  | 'rose'
  | 'amber'

export interface TagData {
  text: string
  color?: TagColor
}

export interface Link {
  href: string
  logo: Component
}

export interface Project {
  id: number
  title: string
  description: string
  imageUrl?: string
  tags: TagData[]
  links?: Link[]
}

export interface Skill {
  description: string
}

export interface Education {
  id: number
  institute: string
  imageUrl: string
  grade_of_education: string
  start_date: Date
  end_date?: Date
  skills: TagData[]
}

export interface Experience {
  id: number
  name: string
  description: string
  grade_of_employment?: string
  start_date: Date
  end_date?: Date
  summary: string
  imageUrl?: string
  tags: TagData[]
}

export interface NodeProperty {
  label: string
  value: string
}
export interface GraphNode {
  id: string
  label: string
  properties: NodeProperty[]
  primaryParent: string | null
  x: number
  y: number
  angle: number
  wedgeStart: number
  wedgeEnd: number
  visible: boolean
  pinned: boolean
  link?: string
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  label: string
}
