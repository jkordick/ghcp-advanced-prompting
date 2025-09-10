// Blog System - API Service
// Handles all API interactions for blog posts following our standard patterns

import { Post, CreatePostData, UpdatePostData } from './types';

// Standard API response format used throughout our application
interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
}

class BlogApiService {
  private baseUrl = '/api/v1/posts';

  async getPosts(page = 1, limit = 10): Promise<ApiResponse<Post[]>> {
    try {
      const response = await fetch(`${this.baseUrl}?page=${page}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      return {
        success: true,
        data: data.posts,
        message: 'Posts retrieved successfully',
        errors: []
      };
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve posts',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  async getPost(id: string): Promise<ApiResponse<Post>> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const post = await response.json();
      return {
        success: true,
        data: post,
        message: 'Post retrieved successfully',
        errors: []
      };
    } catch (error) {
      console.error('Failed to fetch post:', error);
      return {
        success: false,
        data: null,
        message: 'Failed to retrieve post',
        errors: [error instanceof Error ? error.message : 'Unknown error']
      };
    }
  }

  // Try adding createPost, updatePost, and deletePost methods
  // Notice how Copilot will follow the same pattern established above

}

export default BlogApiService;