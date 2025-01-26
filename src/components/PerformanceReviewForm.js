import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';  // Replaced useHistory with useNavigate
import axios from 'axios';

function PerformanceReviewForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [dateEvaluation, setDateEvaluation] = useState('');
  const [note, setNote] = useState('');
  const [commentaires, setCommentaires] = useState('');
  const navigate = useNavigate();  // Replaced useHistory with useNavigate
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchPerformanceReview(id);
    }
  }, [id]);

  const fetchPerformanceReview = async (id) => {
    try {
      const response = await axios.get('https://github.com/amineammari/hrm_back.git/api/performance-reviews/${id}', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const { employee_id, date_evaluation, note, commentaires } = response.data;
      setEmployeeId(employee_id);
      setDateEvaluation(date_evaluation);
      setNote(note);
      setCommentaires(commentaires);
    } catch (error) {
      console.error('Error fetching performance review:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const performanceReview = {
      employee_id: employeeId,
      date_evaluation: dateEvaluation,
      note: note,
      commentaires: commentaires,
    };

    try {
      if (id) {
        await axios.put('https://github.com/amineammari/hrm_back.git/api/performance-reviews/${id}', performanceReview, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post('https://github.com/amineammari/hrm_back.git/api/performance-reviews', performanceReview, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      navigate('/performance-reviews');  // Replaced history.push with navigate
    } catch (error) {
      console.error('Error saving performance review:', error);
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Performance Review' : 'Add Performance Review'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee ID:</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Evaluation:</label>
          <input
            type="date"
            value={dateEvaluation}
            onChange={(e) => setDateEvaluation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Note:</label>
          <input
            type="number"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Comments:</label>
          <textarea
            value={commentaires}
            onChange={(e) => setCommentaires(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default PerformanceReviewForm;
