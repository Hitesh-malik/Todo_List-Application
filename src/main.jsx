import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// to ever use toast also add 8th and 10 line
// toast container
import { ToastContainer } from 'react-toastify';
// toast container css file
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    {/* addd this that we are using this container */}
    {/* <ToastContainer /> */}
    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
    <App />
  </div>
);
