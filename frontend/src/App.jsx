import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
      <Route path="/login" element={<Login />} />
      {/* Other routes */}
    </Routes>
    </>
  )
}

export default App
