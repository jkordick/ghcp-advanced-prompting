// Blog System - Post Editor Component
// React component for creating and editing blog posts

import React, { useState, useEffect } from 'react';
import { Post, CreatePostData, UpdatePostData } from './types';
import BlogApiService from './api-service';

interface PostEditorProps {
  postId?: string; // If provided, we're editing; if not, we're creating
  onSave?: (post: Post) => void;
  onCancel?: () => void;
}

const PostEditor: React.FC<PostEditorProps> = ({ postId, onSave, onCancel }) => {
  const [post, setPost] = useState<Partial<Post>>({
    title: '',
    content: '',
    tags: [],
    status: 'draft'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiService = new BlogApiService();

  useEffect(() => {
    if (postId) {
      loadPost(postId);
    }
  }, [postId]);

  const loadPost = async (id: string) => {
    setLoading(true);
    const response = await apiService.getPost(id);
    
    if (response.success && response.data) {
      setPost(response.data);
    } else {
      setError(response.message);
    }
    setLoading(false);
  };

  // Try adding handleSave, handleInputChange, and form validation
  // Notice how Copilot understands the component patterns and data flow

  // The component will follow our established patterns for:
  // - Error handling and loading states
  // - Form input management
  // - API integration
  // - Event handler naming conventions

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <form className="post-editor">
      {/* Add form inputs here - try letting Copilot suggest the form structure */}
      {/* Notice how it will pick up on the Post interface and suggest appropriate inputs */}
    </form>
  );
};

export default PostEditor;