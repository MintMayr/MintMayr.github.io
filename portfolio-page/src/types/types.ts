export type TagColor = 'blue' | 'teal' | 'yellow' | 'red' | 'green' | 'gray' | 'violet';

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
