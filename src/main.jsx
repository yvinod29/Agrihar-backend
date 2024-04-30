import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
 import './index.css'
import { AuthProvider } from './context/AuthProvider.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>

  <Provider store={store }>
    <AuthProvider>

     <App />
    </AuthProvider>
  </Provider>
   
   </BrowserRouter>
 )
