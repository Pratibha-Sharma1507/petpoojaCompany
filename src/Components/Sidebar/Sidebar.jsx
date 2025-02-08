import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaUserTie } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Sidebar() {
  return (
    <div className="bg-dark text-white p-3 vh-100 position-fixed" style={{ width: "220px", left: 0, top: 0 }}>
      <h4 className="text-center">Dashboard</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/" className="nav-link text-white d-flex align-items-center">
            <FaHome className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/department" className="nav-link text-white d-flex align-items-center">
            <FaBuilding className="me-2" /> Department
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/employee" className="nav-link text-white d-flex align-items-center">
            <FaUserTie className="me-2" /> Employee
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
