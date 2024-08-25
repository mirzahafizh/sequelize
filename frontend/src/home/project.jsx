import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const serverUrl = import.meta.env.VITE_SERVER; // Define serverUrl here

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${serverUrl}/projects`);
        setProjects(response.data.data); // Assuming the API returns the projects in 'data'
      } catch (error) {
        console.error('Error fetching projects:', error.response?.data?.message || error.message);
        alert('Failed to fetch projects. Please try again.');
      }
    };

    fetchProjects();
  }, [serverUrl]); // Include serverUrl in the dependency array if needed

  return (
    <section id="projects" className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Projects</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center justify-between w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <img
              src={`${serverUrl}/uploads/${project.image}`}
              alt={project.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{project.name}</h3>
            <a
              href={project.link}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Project
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
