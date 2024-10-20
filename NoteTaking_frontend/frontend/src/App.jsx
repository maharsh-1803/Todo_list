import './App.css'
import AddNote from './components/AddNote'
import Login from './components/Login'
import NotesList from './components/NotesList'
import Signup from './components/Signup'
import {Routes,Route,Navigate} from 'react-router-dom'

function App() {
  const token = localStorage.getItem('token')
  
  return (
    <>
        <Routes>
        {token ? (
        <>
          <Route path='addNote' element={<AddNote />} />
          <Route path='notesList' element={<NotesList />} />
        </>
      ) : (
        <Navigate to='/'  />
      )}
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        </Routes>
    </>
  )
}

export default App
