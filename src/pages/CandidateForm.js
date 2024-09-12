import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/candidates';

function CandidateForm({ addCandidate }) {
  const [candidate, setCandidate] = useState({
    name: '',
    age: '',
    category: 'General',
    location: 'Urban',
    marks: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSubmitting) return; 

    setIsSubmitting(true); 

    axios.post(API_URL, candidate)
      .then(response => {
        addCandidate(response.data); 
        setCandidate({
          name: '',
          age: '',
          category: 'General',
          location: 'Urban',
          marks: ''
        });
        setIsSubmitting(false); 
      })
      .catch(error => {
        console.error('Error adding candidate:', error);
        alert('Failed to add candidate. Please try again.');
        setIsSubmitting(false); 
      });
  };

  return (
    <div className="candidate-form-container">
      <h1>UPSC-Selection-Dashboard</h1> 
      <form onSubmit={handleSubmit} className="candidate-form">
        <input
          type="text"
          name="name"
          value={candidate.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={candidate.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <select name="category" value={candidate.category} onChange={handleChange}>
          <option value="General">General</option>
          <option value="SC/ST">SC/ST</option>
          <option value="OBC">OBC</option>
          <option value="EWS">EWS</option>
        </select>
        <select name="location" value={candidate.location} onChange={handleChange}>
          <option value="Urban">Urban</option>
          <option value="Rural">Rural</option>
        </select>
        <input
          type="number"
          name="marks"
          value={candidate.marks}
          onChange={handleChange}
          placeholder="Marks"
          required
        />
        <button type="submit" disabled={isSubmitting}>Add Candidate</button>
      </form>
    </div>
  );
}

export default CandidateForm;
