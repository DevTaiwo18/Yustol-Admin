import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Home.css'; // CSS for styling

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/signin');
  };

  return (
    <div className="home-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">Travel Admin</div>
        <nav className="sidebar-nav">
          <ul>
            <li onClick={() => navigate('/home/add-package')}>Add Packages</li>
            <li onClick={() => navigate('/home/packages')}>Get Packages</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="main-header">
          <h1>Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>

        {/* Content Area */}
        <div className="content">
          <Outlet /> {/* Dynamically render child routes here */}
        </div>
      </main>
    </div>
  );
};

export default Home;
