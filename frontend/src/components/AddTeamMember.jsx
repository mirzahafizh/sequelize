import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTeamMember = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [linkLinkedin, setLinkLinkedin] = useState('');
  const [linkInstagram, setLinkInstagram] = useState('');
  const [linkGithub, setLinkGithub] = useState('');
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('position', position);
    formData.append('linkedin', linkLinkedin);
    formData.append('link_instagram', linkInstagram);
    formData.append('link_github', linkGithub);
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.post('http://localhost:3000/teams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/dashboard/manage_team');
    } catch (error) {
      console.error('Error adding team member:', error.response?.data?.message || error.message);
      alert('Failed to add team member. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Add New Team Member</h2>
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
          <label className="block text-gray-700">Position</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">LinkedIn Link</label>
          <input
            type="url"
            value={linkLinkedin}
            onChange={(e) => setLinkLinkedin(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Instagram Link</label>
          <input
            type="url"
            value={linkInstagram}
            onChange={(e) => setLinkInstagram(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">GitHub Link</label>
          <input
            type="url"
            value={linkGithub}
            onChange={(e) => setLinkGithub(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Team Member
        </button>
      </form>
    </div>
  );
};

export default AddTeamMember;
