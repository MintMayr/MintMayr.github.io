export type TagColor = 'blue' | 'teal' | 'yellow' | 'red' | 'green' | 'gray' | 'violet' | 'brown';

export interface TagData {
  text: string;
  color?: TagColor;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  tags: TagData[];
}

export interface Skill {
  description: string;
}

export interface Education {
  id: number;
  institute: string;
  imageUrl: string;
  grade_of_education: string;
  start_date: Date;
  end_date?: Date;
  skills: Skill[];
}

export interface Experience {
  id: number;
  name: string;
  start_date: Date;
  end_date?: Date;
  summary: string;
  tags: TagData[];
}
