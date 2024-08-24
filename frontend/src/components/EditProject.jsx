import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditProject = () => {
  const { id } = useParams(); // Project ID from the URL
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [linkProject, setLinkProject] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/projects/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const project = response.data.data;
        setName(project.name);
        setDescription(project.description);
        setLinkProject(project.link_project);
        setCurrentImage(project.image);
      } catch (error) {
        console.error('Error fetching project:', error.response?.data?.message || error.message);
        alert('Failed to fetch project details. Please try again.');
      }
    };

    fetchProject();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('link_project', linkProject);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:3000/projects/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard/manage_project');
    } catch (error) {
      console.error('Error updating project:', error.response?.data?.message || error.message);
      alert('Failed to update project. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            rows="4"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Link</label>
          <input
            type="url"
            value={linkProject}
            onChange={(e) => setLinkProject(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {currentImage && (
            <img
              src={`http://localhost:3000/uploads/${currentImage}`}
              alt="Current"
              className="mt-2 w-32 h-32 object-cover"
            />
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProject;
