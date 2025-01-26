import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EmployeeForm() {
  const [employee, setEmployee] = useState({
    nom: '',
    prénom: '',
    email: '',
    poste: '',
    département: '',
    date_d_embauche: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchEmployee(id);
    }
  }, [id]);

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(`/api/employees/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployee(response.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/employees/${id}`, employee, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post('/api/employees', employee, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      navigate('/employees');  // Replaced history.push with navigate
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Employee' : 'Add Employee'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            name="nom"
            value={employee.nom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Prénom:</label>
          <input
            type="text"
            name="prénom"
            value={employee.prénom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Poste:</label>
          <input
            type="text"
            name="poste"
            value={employee.poste}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Département:</label>
          <input
            type="text"
            name="département"
            value={employee.département}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date d'embauche:</label>
          <input
            type="date"
            name="date_d_embauche"
            value={employee.date_d_embauche}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
