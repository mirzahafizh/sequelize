import axios from 'axios';
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [alertMessage, setAlertMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/contact/send', formData);
      if (response.data.success) {
        setIsSuccess(true);
        setAlertMessage('Your message has been sent successfully.');
      } else {
        setIsSuccess(false);
        setAlertMessage('Failed to send your message. Please try again.');
      }
    } catch (error) {
      setIsSuccess(false);
      setAlertMessage('An error occurred. Please try again.');
      console.error('Error sending message:', error.response?.data?.message || error.message);
    }
  };

  return (
    <section id="contact" className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Send Us a Message</h3>
        <form id="contactForm" className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2 text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full h-12 rounded-md bg-gray-800 text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            Send Message
          </button>
        </form>
        {alertMessage && (
          <div
            id="alertMessage"
            className={`mt-4 p-4 rounded-md text-white ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
          >
            {alertMessage}
          </div>
        )}
      </div>
    </section>
  );
};

export default Contact;
