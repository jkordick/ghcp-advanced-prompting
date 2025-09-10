// Blog System - Post Interface
// This file defines the structure for blog posts used throughout the system

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  publishedAt: Date | null;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  slug: string;
  excerpt?: string;
  featuredImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CreatePostData {
  title: string;
  content: string;
  authorId: string;
  tags?: string[];
  excerpt?: string;
  featuredImage?: string;
}

interface UpdatePostData extends Partial<CreatePostData> {
  status?: 'draft' | 'published' | 'archived';
}

export { Post, CreatePostData, UpdatePostData };