import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import './custom.scss';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Properties from './components/Properties';
import Register from './components/Register';
import NewPropertyForm from './components/NewPropertyForm';
import Topbar from './components/Topbar';

const isAuthenticated = () => {
  return localStorage.getItem('authToken ');
}
const PrivateRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? <>{element}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <>
      <Topbar />
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={isAuthenticated ? <Login /> : <Properties />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/properties' element={<Properties />}></Route>
          <Route path='/newProperty' element={<NewPropertyForm />}></Route>
          <Route></Route>
          <Route></Route>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;