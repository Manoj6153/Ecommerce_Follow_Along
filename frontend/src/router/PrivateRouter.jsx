import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
function PrivateRouter({children}) {
  const {user}=useSelector(state=>state.user)
const navigate=useNavigate()

  if(user!==null){
    return children
  }
  navigate('/login')

}

export default PrivateRouter