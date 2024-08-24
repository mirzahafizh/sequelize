import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteProject = () => {
  const { id } = useParams(); // Project ID from the URL
  const navigate = useNavigate();

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard/manage_project');
    } catch (error) {
      console.error('Error deleting project:', error.response?.data?.message || error.message);
      alert('Failed to delete project. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Delete Project</h2>
      <p className="mb-4">Are you sure you want to delete this project?</p>
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4"
      >
        Delete
      </button>
      <button
        onClick={() => navigate('/dashboard/manage_project')}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Cancel
      </button>
    </div>
  );
};

export default DeleteProject;
