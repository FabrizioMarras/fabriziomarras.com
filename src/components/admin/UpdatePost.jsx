import { useState, useEffect } from 'react';

const UpdatePost = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:3333/posts/${postId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }
        const postData = await response.json();
        setTitle(postData.title);
        setContent(postData.content);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to fetch post. Please try again later.');
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3333/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
      // Optionally, handle successful update
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Failed to update post. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Update Post</h2>
      {error && <p>{error}</p>}
      {!error && <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Update Post</button>
      </form>}
    </div>
  );
};

export default UpdatePost;
