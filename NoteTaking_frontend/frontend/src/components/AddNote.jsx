import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/note/addNote', {
        title,
        content,
      }, {
        headers: {
          Authorization: token
        }
      });
      console.log('Note added successfully', response.data);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error:', error);
      setError(error.response && error.response.data && error.response.data.message ? error.response.data.message : 'An unexpected error occurred');
    }
  };
  const handleClick = ()=>{
    navigate('/notesList')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Add a New Note
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter the title"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium mb-2"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded h-32"
              placeholder="Enter the content"
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-xs italic">{error}</p>}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Note
            </button>
            <button
              type="submit"
              onClick={handleClick}
              className="bg-blue-500 text-white py-2 px-4 mx-2 rounded hover:bg-blue-600 transition duration-200"
            >
              My Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
