import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import ProtectedRoute from './Services/ProtectedRoute';
import Register from './Pages/Register';
import AppFooter from './Components/AppFooter';
import RestaurantDashboard from './Pages/RestaurantDashboard';
import CreateRestaurant from './Pages/CreateRestaurant';
import EditRestaurant from './Pages/EditRestaurant';
import RestaurantMenu from './Pages/RestaurantMenu';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/restaurant' element={
          <ProtectedRoute allowedRoles={['RESTAURANT_OWNER']}>
            <RestaurantDashboard/>
          </ProtectedRoute>
        }
        />
        <Route path='/restaurant/create' element={<CreateRestaurant />} />
        <Route path='/restaurant/:id/edit' element={<EditRestaurant/>} />
        <Route path='/restaurant/:id/menu' element={<RestaurantMenu/>} />
      </Routes>
      <AppFooter/>
    </>
  );
}

export default App;