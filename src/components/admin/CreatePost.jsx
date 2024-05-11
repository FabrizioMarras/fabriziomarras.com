import { useState } from 'react';
import apiUrl from '../../constants/apiUrl';

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to backend to create new post
      const response = await fetch(`${apiUrl}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('New post created:', data);
      // Reset form data after successful submission
      setFormData({
        title: '',
        content: '',
        image: '',
        tags: [],
      });
    } catch (error) {
      console.error('Error creating new post:', error);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        className="required:border-red-500 bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
      <label htmlFor="content">Content</label>
      <textarea
        id="content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        required
        className="required:border-red-500 bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" >

      </textarea>
      <label htmlFor="image">Image URL</label>
      <input
        type="text"
        id="image"
        name="image"
        value={formData.image}
        onChange={handleChange}
        className="required:border-red-500 bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
      <label htmlFor="tags">Tags (comma-separated)</label>
      <input
        type="text"
        id="tags"
        name="tags"
        value={formData.tags}
        onChange={handleChange}
        className="required:border-red-500 bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic placeholder:text-[12px] text-white rounded-lg outline-none border-none font-medium" />
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost