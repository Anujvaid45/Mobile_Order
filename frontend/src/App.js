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
import PageNotFound from './pages/PageNotFound.js';
import UserRoute from './components/Routes/UserRoute.js';
import UserDashboard from './pages/user/UserDashboard.js';
import UserProfile from './pages/user/UserProfile.js';
import UserOrder from './pages/user/UserOrder.js';
import ProductDetails from './pages/ProductDetails.js';
import CartPage from './pages/CartPage.js';
import AboutUs from './pages/AboutUs.js';
import Contact from './pages/Contact.js';
import Policy from './pages/Policy.js';
import Welcome from './pages/Welcome.js';
function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/products' element={<HomePage />}/>
    <Route path='/' element={<Welcome/>}/>
    <Route path='/product/:slug' element={<ProductDetails />}/>
    <Route path='/cart' element={<CartPage/>}/>

      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/about' element={<AboutUs/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>

      <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<UserProfile/>} />
          <Route path="user/orders" element={<UserOrder/>} />
        </Route>
      <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct/>} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users/>} />
          <Route path="admin/orders" element={<AdminOrders/>} />
        </Route>

        <Route path='/*' element={<PageNotFound />}/>


    </Routes>
    </BrowserRouter>

  );
}

export default App;
