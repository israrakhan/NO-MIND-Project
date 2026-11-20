import React, { useState } from 'react';
import BlogHero from '../components/blog/BlogHero';
import FeaturedPost from '../components/blog/FeaturedPost';
import BlogGrid from '../components/blog/BlogGrid';
import PostReader from '../components/blog/PostReader';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <>
      <BlogHero 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />
      
      {/* Only show Featured Post if selectedCategory is 'All' */}
      {selectedCategory === 'All' && (
        <FeaturedPost onOpenPost={setSelectedPost} />
      )}
      
      <BlogGrid 
        selectedCategory={selectedCategory} 
        onOpenPost={setSelectedPost} 
      />
      
      {selectedPost && (
        <PostReader 
          post={selectedPost} 
          onClose={() => setSelectedPost(null)} 
        />
      )}
    </>
  );
}
