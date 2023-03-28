import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import Profile from './pages/Profile';
import AdminLogin from './pages/AdminLogin';
import AdminHome from './pages/AdminHome';
import ErrorPage from './pages/ErrorPage';

function App() {
  const user = useSelector((state) => state.loginUserReducer.user);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />

          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/adminHome" element={<AdminHome />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
