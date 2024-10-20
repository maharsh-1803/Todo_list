import { useState } from 'react';
import axios from 'axios';
import {Link,useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset the error state before the request
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', {
        email,
        password,
      });
      console.log('success', response.data);
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);
    } catch (err) {
      console.error('Error:', err);
      setError(err.response ? err.response.data : 'An unexpected error occurred');
    }
  };

  const handleClick = ()=>{
    navigate('/addNote')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Login</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <p className="text-red-500 text-xs italic">{error}</p>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleClick}
          >
            Login
          </button>
          <Link to='/signup' className="text-blue-500 hover:underline">Dont have an account?</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
