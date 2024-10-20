import { useEffect, useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/note/getNote",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setNotes(response.data.notes);
      } catch (error) {
        setError(
          error.response ? error.response.data : "An unexpected error occurred"
        );
      }
    };

    fetchNotes();
  }, []);

  const editNote = async (id, newTitle, newContent) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/note/updateNote/${id}`,
        {
          title: newTitle,
          content: newContent,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setNotes(
        notes.map((note) =>
          note._id === id
            ? { ...note, title: newTitle, content: newContent }
            : note
        )
      );
    } catch (error) {
      setError(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  };

  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/note/deleteNote/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      setError(
        error.response ? error.response.data : "An unexpected error occurred"
      );
    }
  };

  const handleClick = ()=>{
    navigate('/addNote')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-4">
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            {note.title}
          </h2>
          <p className="text-gray-700 mb-6">{note.content}</p>
          <div className="flex space-x-4">
            <button
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-200"
              onClick={() => {
                const newTitle = prompt("Enter new title", note.title);
                const newContent = prompt("Enter new content", note.content);
                if (newTitle && newContent) {
                  editNote(note._id, newTitle, newContent);
                }
              }}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              onClick={() => deleteNote(note._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleClick}>
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NotesList;
