import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import the icons
import { useNavigate } from 'react-router-dom';

const ManageTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teams', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTeamMembers(response.data.data); // Assuming the API returns the team members in 'data'
      } catch (error) {
        console.error('Error fetching team members:', error.response?.data?.message || error.message);
        alert('Failed to fetch team members. Please try again.');
      }
    };

    fetchTeamMembers();
  }, [navigate]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Confirm delete action
    const confirmDelete = window.confirm('Are you sure you want to delete this team member?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/teams/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update state to remove deleted team member
      setTeamMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== id)
      );
      alert('Team member deleted successfully.');
    } catch (error) {
      console.error('Error deleting team member:', error.response?.data?.message || error.message);
      alert('Failed to delete team member. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Manage Team</h2>
      <button
        onClick={() => navigate('/dashboard/add_team_member')}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add New Team Member
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center justify-between"
          >
            <img
              src={`http://localhost:3000/uploads/${member.image}`}
              alt={member.name}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-2">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.position}</p>
            <div className="flex space-x-4 mb-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  className="text-blue-700 hover:text-blue-900"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin size={24} />
                </a>
              )}
              {member.link_instagram && (
                <a
                  href={member.link_instagram}
                  className="text-pink-500 hover:text-pink-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram size={24} />
                </a>
              )}
              {member.link_github && (
                <a
                  href={member.link_github}
                  className="text-gray-900 hover:text-gray-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub size={24} />
                </a>
              )}
            </div>
            <div className="flex justify-center space-x-2">
              <button
                onClick={() => navigate(`/dashboard/edit_team/${member.id}`)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(member.id)}
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

export default ManageTeam;
