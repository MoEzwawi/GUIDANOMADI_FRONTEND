import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Properties from './components/Properties';
import Register from './components/Register';
import NewPropertyForm from './components/NewPropertyForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
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