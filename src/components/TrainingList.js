import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get('https://github.com/amineammari/hrm_back.git/api/trainings', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTrainings(response.data);
    } catch (error) {
      console.error('Error fetching trainings:', error);
    }
  };

  const deleteTraining = async (id) => {
    try {
      await axios.delete(`https://github.com/amineammari/hrm_back.git/api/trainings/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchTrainings();
    } catch (error) {
      console.error('Error deleting training:', error);
    }
  };

  return (
    <div>
      <h2>Trainings</h2>
      <Link to="/training-form">Add Training</Link>
      <ul>
        {trainings.map((training) => (
          <li key={training.id}>
            {training.nom_formation} - {training.date_formation}
            <Link to={`/training-form/${training.id}`}>Edit</Link>
            <button onClick={() => deleteTraining(training.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainingList;
