import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to home if there is a token
      navigate('/home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting login

    try {
      const response = await axios.post('http://localhost:3000/users/login', {
        email: email.trim(),
        password
      }, {
        headers: {
          'Accept': 'application/json'
        }
      });

      setMessage(`Login successful! Token: ${response.data.token}`);
      localStorage.setItem('token', response.data.token);

      // Navigate to home page after successful login
      navigate('/home');
    } catch (error) {
      console.error("Login error:", error);
      setMessage(error.response?.data?.message || 'Error during login');
    } finally {
      setLoading(false); // Set loading to false after completion
    }
  };

  const handleLogout = () => {
    // Clear token from local storage and navigate to login page
    localStorage.removeItem('token');
    setMessage('Logged out successfully'); // Show logout message
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && (
        <div className="mt-4 p-2 bg-gray-200 text-gray-800 rounded-lg">
          {message}
        </div>
      )}

      {/* Logout button, only visible if user is logged in */}
      {localStorage.getItem('token') && (
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default Login;
