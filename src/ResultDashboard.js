import React from 'react';

function ResultDashboard({ results, cutoffs }) {
  return (
    <div className="result-dashboard">
      <h2>Result Dashboard</h2>
      <div>
        <p><strong>General Cutoff:</strong> {cutoffs.General}</p>
        <p><strong>SC/ST Cutoff:</strong> {cutoffs['SC/ST']}</p>
        <p><strong>OBC Cutoff:</strong> {cutoffs.OBC}</p>
        <p><strong>EWS Cutoff:</strong> {cutoffs.EWS}</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {results.map((candidate, index) => (
            <tr key={index}>
              <td>{candidate.name}</td>
              <td>{candidate.category}</td>
              <td>{candidate.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultDashboard;