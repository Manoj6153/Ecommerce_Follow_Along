import axios from "axios"

 export const loginuser=(data)=>async(dispatch)=>{
    const response= await axios.post('https://ecommerce-follow-along-1-trh6.onrender.com/user/login',data)
     if(response.status==="200"){
         dispatch({type:"LOGIN_SUCCESS",payload:data})
     }
     dispatch({type:"LOGIN_FAILURE",payload:"ther is error"})
 }
 