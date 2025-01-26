import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function LeaveForm() {
  const [leave, setLeave] = useState({
    employee_id: '',
    type_de_conge: '',
    date_debut: '',
    date_fin: '',
    statut: ''
  });

  const navigate = useNavigate();  // Replaced useHistory with useNavigate
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchLeave(id);
    }
  }, [id]);

  const fetchLeave = async (id) => {
    try {
      const response = await axios.get(`/api/leaves/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLeave(response.data);
    } catch (error) {
      console.error('Error fetching leave:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave((prevLeave) => ({
      ...prevLeave,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/leaves/${id}`, leave, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post('/api/leaves', leave, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      navigate('/leaves');  // Replaced history.push with navigate
    } catch (error) {
      console.error('Error saving leave:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Leave' : 'Add Leave'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employee_id"
            value={leave.employee_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Type de Congé:</label>
          <input
            type="text"
            name="type_de_conge"
            value={leave.type_de_conge}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date Début:</label>
          <input
            type="date"
            name="date_debut"
            value={leave.date_debut}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Date Fin:</label>
          <input
            type="date"
            name="date_fin"
            value={leave.date_fin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Statut:</label>
          <input
            type="text"
            name="statut"
            value={leave.statut}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default LeaveForm;
