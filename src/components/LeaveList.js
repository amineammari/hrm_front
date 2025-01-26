import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function LeaveList() {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await axios.get('/api/leaves', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLeaves(response.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const deleteLeave = async (id) => {
    try {
      await axios.delete(`/api/leaves/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchLeaves();
    } catch (error) {
      console.error('Error deleting leave:', error);
    }
  };

  return (
    <div>
      <h1>Leave List</h1>
      <Link to="/leave-form">Add Leave</Link>
      <ul>
        {leaves.map((leave) => (
          <li key={leave.id}>
            {leave.type_de_conge} - {leave.date_debut} to {leave.date_fin} - {leave.statut}
            <Link to={`/leave-form/${leave.id}`}>Edit</Link>
            <button onClick={() => deleteLeave(leave.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LeaveList;
