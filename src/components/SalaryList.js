import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SalaryList() {
  const [salaries, setSalaries] = useState([]);

  useEffect(() => {
    fetchSalaries();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('https://github.com/amineammari/hrm_back.git/api/salaries', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSalaries(response.data);
    } catch (error) {
      console.error('Error fetching salaries:', error);
    }
  };

  const deleteSalary = async (id) => {
    try {
      await axios.delete(`https://github.com/amineammari/hrm_back.git/api/salaries/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchSalaries();
    } catch (error) {
      console.error('Error deleting salary:', error);
    }
  };

  return (
    <div>
      <h1>Salary List</h1>
      <Link to="/salary-form">Add Salary</Link>
      <ul>
        {salaries.map((salary) => (
          <li key={salary.id}>
            Employee ID: {salary.employee_id} - Base Salary: {salary.salaire_de_base}
            <Link to={`/salary-form/${salary.id}`}>Edit</Link>
            <button onClick={() => deleteSalary(salary.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SalaryList;
