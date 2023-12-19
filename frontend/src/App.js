import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import HomePage from './pages/HomePage.js';
import Search from './pages/Search.js';
import AdminRoute from './components/Routes/AdminRoute.js';
import AdminDashboard from './pages/Admin/AdminDashboard.js';
import CreateProduct from './pages/Admin/CreateProduct.js';
import Products from './pages/Admin/Products.js';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Users from './pages/Admin/Users.js';
import AdminOrders from './pages/Admin/AdminOrders.js';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={<HomePage />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/search' element={<Search/>}/>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />
        </Route>


    </Routes>
    </BrowserRouter>

  );
}

export default App;
