import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
    return (
        <>
            <Routes>
                {/* Default route */}
                <Route path="/" element={<Login />} /> {/* You can change this to a Home component or any other default page */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                {/* Other routes */}
            </Routes>
        </>
    );
}

export default App;
