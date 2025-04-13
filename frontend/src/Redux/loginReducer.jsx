import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "./actiontype";
 
 const initstate={
     email:null,
     password:null
 }
 export const userReducer = (state = initstate, action) => {
     switch (action.type) {
       case LOGIN_SUCCESS:
         return { ...state, user: action.payload, error: null };
       case LOGIN_FAILURE:
         return { ...state, user: null, error: action.payload };
       case LOGOUT:
         return { ...state, user: null };
       default:
         return state;
     }
   };