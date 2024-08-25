import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditTeamMember = () => {
  const [member, setMember] = useState({
    name: '',
    position: '',
    linkedin: '',
    link_instagram: '',
    link_github: '',
    image: null,
  });
  const [imagePreview, setImagePreview] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchMember = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/teams/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMember(response.data.data);
        setImagePreview(`${import.meta.env.VITE_SERVER}/uploads/${response.data.data.image}`);
      } catch (error) {
        console.error('Error fetching team member:', error.response?.data?.message || error.message);
        alert('Failed to fetch team member. Please try again.');
      }
    };

    fetchMember();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setMember((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setMember((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const formData = new FormData();
    for (const key in member) {
      formData.append(key, member[key]);
    }

    try {
      await axios.put(`${import.meta.env.VITE_SERVER}/teams/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Team member updated successfully.');
      navigate('/dashboard/manage_team');
    } catch (error) {
      console.error('Error updating team member:', error.response?.data?.message || error.message);
      alert('Failed to update team member. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Edit Team Member</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={member.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="position">
            Position
          </label>
          <input
            type="text"
            id="position"
            name="position"
            value={member.position}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="linkedin">
            LinkedIn
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={member.linkedin}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link_instagram">
            Instagram
          </label>
          <input
            type="url"
            id="link_instagram"
            name="link_instagram"
            value={member.link_instagram}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="link_github">
            GitHub
          </label>
          <input
            type="url"
            id="link_github"
            name="link_github"
            value={member.link_github}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
            Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover mt-4"
            />
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTeamMember;
