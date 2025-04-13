
import {Routes, Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './pages/Homepage'
import Cart from './Pages/CArt'
import MyProducts from './pages/MyProducts'
import AddressForm from './Pages/AddressForm'
import { Productform } from './Pages/ProductForm'
import { ProductCardForSeller } from './Components/ProductCardForSeller'
import OrderConfirmation from './Pages/OrderConfirmation'
import SelectAddress from './Pages/SelectAddress'
import './App.css'
import Profile from './pages/Profile'
import PrivateRouter from './Router/PrivateRouter'
import EditProduct from'./pages/EditProduct'

function App() {
 

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/sign-up' element={<Signup/>} />
      <Route path='/' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/my-products' element={<MyProducts />}></Route>
      <Route path="/create-product" element={
           <PrivateRouter>
           <Productform />
           </PrivateRouter>} />
      <Route path='/my-product' element={<ProductCardForSeller/>}/>
      <Route path='/profile' element={<Profile />}></Route>
      <Route path='/add-address' element={<AddressForm />}></Route>
      <Route path='/select-address' element={<SelectAddress />}></Route>
      <Route path='confirm-order' element={<OrderConfirmation />}></Route>
      <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>
    {/* <Link to='/login'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button></Link>
    <Link to='/sign-up'><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign up</button></Link> */}
     

    </>
  )
}

export default App
