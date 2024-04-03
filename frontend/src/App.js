import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Navbar />} >
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;
