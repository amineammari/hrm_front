import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Replaced useHistory with useNavigate

function TrainingForm() {
  const [training, setTraining] = useState({
    employee_id: '',
    nom_formation: '',
    date_formation: '',
  });

  const navigate = useNavigate();  // Replaced useHistory with useNavigate
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchTraining(id);
    }
  }, [id]);

  const fetchTraining = async (id) => {
    try {
      const response = await axios.get(`/api/trainings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTraining(response.data);
    } catch (error) {
      console.error('Error fetching training:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTraining((prevTraining) => ({
      ...prevTraining,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`/api/trainings/${id}`, training, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post('/api/trainings', training, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      navigate('/trainings');  // Replaced history.push with navigate
    } catch (error) {
      console.error('Error saving training:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Training' : 'Add Training'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            name="employee_id"
            value={training.employee_id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Training Name:</label>
          <input
            type="text"
            name="nom_formation"
            value={training.nom_formation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Training Date:</label>
          <input
            type="date"
            name="date_formation"
            value={training.date_formation}
            onChange={handleChange}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default TrainingForm;
