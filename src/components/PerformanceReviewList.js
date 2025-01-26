import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PerformanceReviewList() {
  const [performanceReviews, setPerformanceReviews] = useState([]);

  useEffect(() => {
    fetchPerformanceReviews();
  }, []);

  const fetchPerformanceReviews = async () => {
    try {
      const response = await axios.get('/api/performance-reviews', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPerformanceReviews(response.data);
    } catch (error) {
      console.error('Error fetching performance reviews:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/performance-reviews/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      fetchPerformanceReviews();
    } catch (error) {
      console.error('Error deleting performance review:', error);
    }
  };

  return (
    <div>
      <h2>Performance Reviews</h2>
      <Link to="/performance-review-form">Add Performance Review</Link>
      <ul>
        {performanceReviews.map((review) => (
          <li key={review.id}>
            <p>Employee ID: {review.employee_id}</p>
            <p>Date of Evaluation: {review.date_evaluation}</p>
            <p>Note: {review.note}</p>
            <p>Comments: {review.commentaires}</p>
            <Link to={`/performance-review-form/${review.id}`}>Edit</Link>
            <button onClick={() => handleDelete(review.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PerformanceReviewList;
