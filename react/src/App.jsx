import React, { useState, useEffect } from 'react'; // Add these imports!
import { BrowserRouter } from 'react-router-dom'; // Changed from BrowserRouter as Router
import { Routes, Route } from 'react-router-dom';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import ApiTable from './pages/ApiTable';
import Counter1 from './pages/Counter1';
import Form from './pages/Form';
import Card from './pages/Card';
import TableContext from './pages/Auth';
import Table from './pages/Table';
import './App.css';

function App() {
  const [submittedData, setSubmittedData] = useState(() => {
    const saved = localStorage.getItem('submittedFormData');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('submittedFormData', JSON.stringify(submittedData));
  }, [submittedData]);

  return (
    <TableContext.Provider value={{ submittedData, setSubmittedData }}>
      <BrowserRouter>
        <div className="app-container">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apitable" element={<ApiTable />} />
              <Route path="/counter" element={<Counter1 />} />
              <Route path="/form" element={<Form />} />
              <Route path="/card" element={<Card />} />
              <Route path="/table" element={<Table />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TableContext.Provider>
  );
}

export default App;