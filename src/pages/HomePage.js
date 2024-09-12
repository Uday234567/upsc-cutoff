import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandidateForm from './CandidateForm';
import CandidateList from './CandidateList';
import ResultPage from './ResultPage';


const API_URL = 'http://localhost:5000/candidates';


const calculate_cutoff = (totalSeats, reservationPercentages, candidates) => {
  
  const MIN_PASSING_MARKS = 40;
  

  
  const categoryCounts = {
    'SC/ST': 0,
    'OBC': 0,
    'EWS': 0,
    'General': 0
  };

  
  const filteredCandidates = candidates.filter(c => c.marks >= MIN_PASSING_MARKS);

  filteredCandidates.forEach(candidate => {
    categoryCounts[candidate.category]++;
  });

  
  const seats = {
    'SC/ST': Math.floor(totalSeats * reservationPercentages['SC/ST']),
    'OBC': Math.floor(totalSeats * reservationPercentages['OBC']),
    'EWS': Math.floor(totalSeats * reservationPercentages['EWS']),
    'General': totalSeats - Math.floor(totalSeats * reservationPercentages['SC/ST']) - Math.floor(totalSeats * reservationPercentages['OBC']) - Math.floor(totalSeats * reservationPercentages['EWS'])
  };

  
  const cutoffs = {};
 
  Object.keys(categoryCounts).forEach(category => {
    const categoryMarks = filteredCandidates.filter(c => c.category === category).map(c => c.marks);
    categoryMarks.sort((a, b) => b - a);

    if (categoryMarks.length > 0 && seats[category] > 0) {
      cutoffs[category] = categoryMarks[Math.min(seats[category] - 1, categoryMarks.length - 1)];
    }
  });

  return cutoffs;
};

function HomePage() {
  const [candidates, setCandidates] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cutoffs, setCutoffs] = useState({});

  
  useEffect(() => {
    axios.get(API_URL)
      .then(response => setCandidates(response.data))
      .catch(error => console.error('Error fetching candidates:', error));
  }, []);

  const addCandidate = (candidate) => {
    axios.post(API_URL, candidate)
      .then(response => {
        if (!candidates.find(c => c.name === response.data.name)) {
          setCandidates([...candidates, response.data]);
        }
      })
      .catch(error => console.error('Error adding candidate:', error));
  };

  const calculateCutoffs = () => {
    const totalSeats = 10; 
    const reservationPercentages = {
      'SC/ST': 0.20,
      'OBC': 0.15,
      'EWS': 0.10
    };

    
    const cutoffValues = calculate_cutoff(totalSeats, reservationPercentages, candidates);
   
    setCutoffs(cutoffValues);
    return cutoffValues;
  };

  const handleShowResults = () => {
    calculateCutoffs(); 
    setShowResults(true);
  };

  return (
    <div className="home-page">
      <CandidateForm addCandidate={addCandidate} />
      <CandidateList candidates={candidates} />
      <button onClick={handleShowResults}>Calculate Results</button>
      {showResults && <ResultPage candidates={candidates} cutoffs={cutoffs} />}
    </div>
  );
}

export default HomePage;