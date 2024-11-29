
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import QuoteList from './components/QuoteList';
import CreateQuote from './components/CreateQuote';
const App = () => {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/quote" element={<QuoteList />} />
          <Route path="/createQuote" element={<CreateQuote />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
