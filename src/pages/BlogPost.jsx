import React, { useState, useEffect } from 'react';

const BlogPost = ({ match }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    // Fetch the specific blog post using match.params.id
    // Example:
    const fetchPost = async () => {
      const postId = match.params.id;
      const response = await fetch(`/api/posts/${postId}`); // Adjust the endpoint according to your API
      const data = await response.json();
      setPost(data);
    };
    fetchPost();
  }, [match.params.id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;
