import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './custom.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Properties from './components/Properties';
import Register from './components/Register';
import NewPropertyForm from './components/NewPropertyForm';
import Topbar from './components/Topbar';
import { useEffect, useState } from 'react';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const checkToken = localStorage.getItem('authToken')
  useEffect(() => {
    checkToken ? setIsAuthenticated(true) : setIsAuthenticated(false)
  }, [checkToken])
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Routes>
          <Route path='/login' element={!isAuthenticated ? <Login /> : < Navigate to="/properties" />}></Route>
          <Route path='/register' element={!isAuthenticated ? <Register /> : < Navigate to="/properties" />}></Route>
          <Route path='/properties' element={isAuthenticated ? <Properties /> : < Navigate to="/login" />}></Route>
          <Route path='/newProperty' element={isAuthenticated ? <NewPropertyForm /> : < Navigate to="/login" />}></Route>
          <Route path='*' element={isAuthenticated ? < Navigate to="/properties" /> : < Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;