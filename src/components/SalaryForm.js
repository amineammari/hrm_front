import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';  // Replaced useHistory with useNavigate

function SalaryForm() {
  const [employeeId, setEmployeeId] = useState('');
  const [baseSalary, setBaseSalary] = useState('');
  const [bonus, setBonus] = useState('');
  const [deductions, setDeductions] = useState('');
  const navigate = useNavigate();  // Replaced useHistory with useNavigate
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchSalary(id);
    }
  }, [id]);

  const fetchSalary = async (id) => {
    try {
      const response = await axios.get('https://github.com/amineammari/hrm_back.git/api/salaries/${id}', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const salary = response.data;
      setEmployeeId(salary.employee_id);
      setBaseSalary(salary.salaire_de_base);
      setBonus(salary.bonus);
      setDeductions(salary.deductions);
    } catch (error) {
      console.error('Error fetching salary:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const salaryData = {
      employee_id: employeeId,
      salaire_de_base: baseSalary,
      bonus: bonus,
      deductions: deductions,
    };

    try {
      if (id) {
        await axios.put('https://github.com/amineammari/hrm_back.git/api/salaries/${id}', salaryData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      } else {
        await axios.post('https://github.com/amineammari/hrm_back.git/api/salaries', salaryData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      }
      navigate('/salaries');  // Replaced history.push with navigate
    } catch (error) {
      console.error('Error saving salary:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Salary' : 'Add Salary'}</h1>
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
          <label>Base Salary:</label>
          <input
            type="text"
            value={baseSalary}
            onChange={(e) => setBaseSalary(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Bonus:</label>
          <input
            type="text"
            value={bonus}
            onChange={(e) => setBonus(e.target.value)}
          />
        </div>
        <div>
          <label>Deductions:</label>
          <input
            type="text"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
          />
        </div>
        <button type="submit">{id ? 'Update' : 'Add'}</button>
      </form>
    </div>
  );
}

export default SalaryForm;
