import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectedRoute from './Services/ProtectedRoute';
import Register from './Pages/Register';
import AppNavbar from './Components/AppNavbar';
import AppFooter from './Components/AppFooter';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        {/* <Route path='/customer' element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <CustomerDashboard/>
          </ProtectedRoute>
        }
        /> */}
      </Routes>
      <AppFooter/>
    </>
  );
}

export default App;