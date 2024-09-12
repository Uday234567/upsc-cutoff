import React, { useState } from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CandidateDetails from './pages/CandidateDetails';
import ResultPage from './pages/ResultPage';

function App() {
  const [candidates, setCandidates] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage setCandidates={setCandidates} candidates={candidates} />} />
          <Route path="/candidate/:name" element={<CandidateDetails candidates={candidates} />} />
          <Route path="/results" element={<ResultPage candidates={candidates} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
