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
import AddMenuItem from './Pages/AddMenu';
import EditMenuItem from './Pages/EditMenu';
import OrdersPage from './Pages/RestaurantOrders';
import OrderDetails from './Pages/RestaurantOrderDetails';
import DeliveryPartner from './Pages/RestaurantDelivery';
import CustomerDashboard from './Pages/CustomerDashboard';
import CustomerMenu from './Pages/CustomerMenu';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/restaurant' element={
          <ProtectedRoute allowedRoles={['RESTAURANT_OWNER']}>
            <RestaurantDashboard />
          </ProtectedRoute>
        }
        />
        <Route path='/restaurant/create' element={<CreateRestaurant />} />
        <Route path='/restaurant/:id/edit' element={<EditRestaurant />} />
        <Route path='/restaurant/:id/menu' element={<RestaurantMenu />} />
        <Route path='/restaurant/:id/menu/add' element={<AddMenuItem />} />
        <Route path='/restaurant/:id/menu/:menuItemId/edit' element={<EditMenuItem />} />
        <Route path='/restaurant/:id/orders' element={<OrdersPage />} />
        <Route path='/restaurant/:id/orders/:orderId' element={<OrderDetails />} />
        <Route path='/restaurant/:orderId/delivery/partners' element={<DeliveryPartner />} />
        <Route path='/customer' element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <CustomerDashboard />
          </ProtectedRoute>
        }
        />
        <Route path='/customer/:restaurantId/menu' element={<CustomerMenu />} />
      </Routes>
      <AppFooter />
    </>
  );
}

export default App;