import {Routes, Route,Link} from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './pages/Homepage'
import Cart from './pages/cart'
import MyProducts from './pages/MyProducts'
import AddressForm from './pages/AddressForm'
import { Productform } from './pages/ProductForm'
import { ProductCardForSeller } from './Components/ProductCardForSeller'
import OrderConfirmation from './pages/OrderConfirmation'
import SelectAddress from './pages/SelectAddress'
import './App.css'
import Profile from './pages/Profile'
import PrivateRouter from './router/PrivateRouter'
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
     

    </>
  )
}

export default App
