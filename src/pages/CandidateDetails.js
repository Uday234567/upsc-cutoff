import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CandidateDetails() {
  const { name } = useParams(); 
  const [candidate, setCandidate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/candidates/name/${name}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Candidate not found');
        }
        return response.json();
      })
      .then(data => {
        setCandidate(data);
      })
      .catch(err => {
        setError(err.message);
      });
  }, [name]);
  

  return (
    <div className="candidate-details">
      <h2>Candidate Details</h2>
      {error ? (
        <p>{error}</p>
      ) : candidate ? (
        <div>
          <p><strong>Name:</strong> {candidate.name}</p>
          <p><strong>Category:</strong> {candidate.category}</p>
          <p><strong>Marks:</strong> {candidate.marks}</p>
          <p><strong>Age:</strong> {candidate.age}</p>
          <p><strong>Location:</strong> {candidate.location}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Back to list</Link>
    </div>
  );
}

export default CandidateDetails;
