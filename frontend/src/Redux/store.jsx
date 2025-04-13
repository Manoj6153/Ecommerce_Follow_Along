import { applyMiddleware, combineReducers, configureStore, legacy_createStore } from '@reduxjs/toolkit'
 import { userReducer } from './loginReducer'
 import { thunk } from 'redux-thunk'
 
 
 export const usereducer1=combineReducers({
     auth:userReducer
 })
 
 export const store=legacy_createStore(usereducer1,applyMiddleware(thunk))