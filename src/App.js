import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import LeaveList from './components/LeaveList';
import LeaveForm from './components/LeaveForm';
import SalaryList from './components/SalaryList';
import SalaryForm from './components/SalaryForm';
import PerformanceReviewList from './components/PerformanceReviewList';
import PerformanceReviewForm from './components/PerformanceReviewForm';
import TrainingList from './components/TrainingList';
import TrainingForm from './components/TrainingForm';
import NotificationForm from './components/NotificationForm';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/employees">Employees</Link>
            </li>
            <li>
              <Link to="/leaves">Leaves</Link>
            </li>
            <li>
              <Link to="/salaries">Salaries</Link>
            </li>
            <li>
              <Link to="/performance-reviews">Performance Reviews</Link>
            </li>
            <li>
              <Link to="/trainings">Trainings</Link>
            </li>
            <li>
              <Link to="/notifications">Notifications</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employee-form" element={<EmployeeForm />} />
          <Route path="/leaves" element={<LeaveList />} />
          <Route path="/leave-form" element={<LeaveForm />} />
          <Route path="/salaries" element={<SalaryList />} />
          <Route path="/salary-form" element={<SalaryForm />} />
          <Route path="/performance-reviews" element={<PerformanceReviewList />} />
          <Route path="/performance-review-form" element={<PerformanceReviewForm />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/training-form" element={<TrainingForm />} />
          <Route path="/notifications" element={<NotificationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
