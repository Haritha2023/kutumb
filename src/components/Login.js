import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QuoteList from './QuoteList';

const Login = () => {
  const [username, setUsername] = useState('Hari');
  const [otp, setOtp] = useState('1234');
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://assignment.stage.crafto.app/login', {
        username,
        otp,
      }, {
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      setToken(response.data.token);
      alert('Login Successful!');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please try again.');
    }
  };

  if (token) {
    return <QuoteList token={token} />;
  }

  return (
    <div className="login-page flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}

export default Login