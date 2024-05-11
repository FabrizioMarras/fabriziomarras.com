import { useState, useEffect } from 'react';
import apiUrl from '../../constants/apiUrl';

const ReadPosts = () => {
  const [posts, setPosts] = useState([]);
  const [noPosts, setNoPosts] = useState("");
  const [error, setError] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      // Fetch the list of posts from the backend
      const response = await fetch(`${apiUrl}/posts`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.log("No posts to show");
        setNoPosts("No posts to show");
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      // Handle error
      // For example, display an error message to the user
      setError('Failed to fetch posts. Please try again later.');
    }
  };

  const handleUpdatePost = (postId) => {
    // Logic to navigate to the update post page or show a modal
    console.log('Update post:', postId);
  };

  const handleDeletePost = async (postId) => {
    try {
      const response = await fetch(`${apiUrl}/posts/${postId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // If the deletion was successful, fetch the posts again to update the list
        fetchPosts();
        console.log('Post deleted successfully.');
      } else {
        console.error('Failed to delete post.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error
      setError('Failed to Delete the post. Please try again later.');
    }
  };
  

  return (
    <div>
      <h2>Read Posts</h2>
      <ul>
        {error && <p>{error}</p>}
        {posts.length === 0 && !error && <p>{noPosts}</p>}
        {posts.length > 0 && posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            {/* Display other post details as needed */}
            <button onClick={() => handleUpdatePost(post.id)}>Update</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReadPosts;
