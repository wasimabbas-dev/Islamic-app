// src/types/Knowledge.ts
export interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage?: string;
  rating: number;
  totalRatings: number;
  publicationYear: number;
  downloadUrl?: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  views: number;
  tags: string[];
}

export interface Fatwa {
  id: string;
  question: string;
  answer: string;
  scholar: string;
  category: string;
  date: string;
  relatedReferences?: string[];
}

export interface KnowledgeCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  slug: string;
}
