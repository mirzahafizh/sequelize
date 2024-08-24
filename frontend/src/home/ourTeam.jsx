import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import the icons

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teams');
        setTeamMembers(response.data.data); // Assuming the API returns the team members in 'data'
      } catch (error) {
        console.error('Error fetching team members:', error.response?.data?.message || error.message);
        alert('Failed to fetch team members. Please try again.');
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section id="our-team" className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Our Team</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="border rounded-lg shadow-lg p-4 flex flex-col items-center justify-between w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
          >
            <img
              src={`http://localhost:3000/uploads/${member.image}`}
              alt={member.name}
              className="w-48 h-48 object-cover rounded-md mb-4"
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
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
