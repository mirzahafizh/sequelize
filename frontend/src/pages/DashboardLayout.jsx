import React, { useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom'; // Import Link for navigation

const DashboardLayout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Ask for user confirmation before logging out
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  return (
    <div className="flex font-mono">
      {/* Sidebar */}
      <aside className="w-20 md:w-64 bg-gray-800 text-white min-h-screen p-6">
        <h2 className="flex items-center justify-center md:justify-start text-2xl font-bold mb-6">
          <i className="fas fa-tachometer-alt mr-0 md:mr-2"></i>
          <span className="hidden md:block">Dashboard</span>
        </h2>
        <nav>
          <ul>
            <li className="mb-4">
              <Link
                to="/dashboard/manage_project"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center justify-center md:justify-start"
              >
                <i className="fas fa-tasks mr-0 md:mr-2"></i>
                <span className="hidden md:block">Manage Projects</span>
              </Link>
            </li>

            <li className="mb-4">
              <Link
                to="/dashboard/manage_team"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center justify-center md:justify-start"
              >
                <i className="fas fa-users mr-0 md:mr-2"></i>
                <span className="hidden md:block">Manage Team</span>
              </Link>
            </li>

            <li className="mt-6">
              <button
                onClick={handleLogout}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md flex items-center justify-center md:justify-start"
              >
                <i className="fas fa-sign-out-alt mr-0 md:mr-2"></i>
                <span className="hidden md:block">Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <Outlet /> {/* Renders the current page content */}
      </div>
    </div>
  );
};

export default DashboardLayout;
