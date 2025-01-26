import React, { useState } from 'react';
import axios from 'axios';

function NotificationForm() {
  const [notification, setNotification] = useState({
    to: '',
    title: '',
    body: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNotification((prevNotification) => ({
      ...prevNotification,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://github.com/amineammari/hrm_back.git/api/notifications', notification, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('Failed to send notification');
    }
  };

  return (
    <div>
      <h1>Send Notification</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>To:</label>
          <input
            type="text"
            name="to"
            value={notification.to}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={notification.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            name="body"
            value={notification.body}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default NotificationForm;
