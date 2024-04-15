import React, { useState } from 'react';
import './App.css'; // Import the CSS file for styling

const ApplicationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    education: '',
    statementOfPurpose: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop and pass formData
    onSubmit(formData);
  };

  return (
    <div className="ApplicationForm">
      <h2>Application Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="Form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Form-group">
          <label htmlFor="education">Education Background:</label>
          <input
            type="text"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          />
        </div>
        <div className="Form-group">
          <label htmlFor="statementOfPurpose">Statement of Purpose:</label>
          <textarea
            id="statementOfPurpose"
            name="statementOfPurpose"
            value={formData.statementOfPurpose}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="Submit-button">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplicationForm;
