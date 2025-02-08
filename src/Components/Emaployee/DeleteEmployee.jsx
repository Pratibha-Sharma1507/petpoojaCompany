import React from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

function DeleteEmployee({ employeeId, refreshData }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:8000/deleteemployee/${employeeId}`);
      refreshData(); 
    } catch (error) {
      console.error("Error deleting employee:", error.response ? error.response.data : error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleDelete}>
      <FaTrash style={{ color: "white" }} />
    </button>
  );
}

export default DeleteEmployee;
