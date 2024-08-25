import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageProject = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjects(response.data.data); // Assuming the API returns the projects in 'data'
      } catch (error) {
        console.error('Error fetching projects:', error.response?.data?.message || error.message);
        alert('Failed to fetch projects. Please try again.');
      }
    };

    fetchProjects();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove deleted project
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
      alert('Project deleted successfully.');
    } catch (error) {
      console.error('Error deleting project:', error.response?.data?.message || error.message);
      alert('Failed to delete project. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
      <button
        onClick={() => navigate('/dashboard/add_project')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Project
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center justify-between"
          >
            <img
              src={`${import.meta.env.VITE_SERVER}/uploads/${project.image}`}
              alt={project.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{project.name}</h3>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <a
              href={project.link_project}
              className="text-blue-500 hover:underline mb-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => navigate(`/dashboard/edit_project/${project.id}`)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProject;
