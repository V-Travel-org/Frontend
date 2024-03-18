import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUpForm from './components/SignUpForm';
import SignUpSuccess from './components/SignUpSuccess';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
