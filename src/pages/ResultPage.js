import React from 'react';

function ResultPage({ candidates, cutoffs }) {
  
  const rankCandidates = (candidates) => {
    
    const categoryPriority = { 'SC/ST': 1, 'OBC': 2, 'EWS': 3, 'General': 4 };

    
    return candidates
      .map(candidate => ({
        ...candidate,
        status: cutoffs[candidate.category] !== undefined && candidate.marks >= cutoffs[candidate.category] ? 'Selected' : 'Rejected',
      }))
      .sort((a, b) => {
        if (b.marks !== a.marks) return b.marks - a.marks;
        if (categoryPriority[a.category] !== categoryPriority[b.category]) return categoryPriority[a.category] - categoryPriority[b.category];
        if (b.age !== a.age) return b.age - a.age;
        return b.location === 'Rural' ? 1 : -1;
      })
      .map((candidate, index) => ({ ...candidate, rank: index + 1 }));
  };

  const rankedCandidates = rankCandidates(candidates);

  return (
    <div className="result-page">
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Category</th>
            <th>Marks</th>
            <th>Age</th>
            <th>Location</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rankedCandidates.map(candidate => (
            <tr key={candidate.id}>
              <td>{candidate.rank}</td>
              <td>{candidate.name}</td>
              <td>{candidate.category}</td>
              <td>{candidate.marks}</td>
              <td>{candidate.age}</td>
              <td>{candidate.location}</td>
              <td>{candidate.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResultPage;