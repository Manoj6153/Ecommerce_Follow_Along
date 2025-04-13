import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux"
import store from "./store/store";
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
// import { store } from './Redux/store.js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
  <StrictMode>
  <App />
</StrictMode>
 </Provider>
 </BrowserRouter>
  
)
