import React from 'react';
import { Link } from 'react-router-dom';

function CandidateList({ candidates }) {
  return (
    <div className="candidate-list">
      <h2>Candidate List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Category</th>
            <th>Location</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.id}> {/* Use unique ID as key */}
              <td>
                <Link to={`/candidate/${encodeURIComponent(candidate.name)}`}>
                  {candidate.name}
                </Link>
              </td>
              <td>{candidate.age}</td>
              <td>{candidate.category}</td>
              <td>{candidate.location}</td>
              <td>{candidate.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CandidateList;