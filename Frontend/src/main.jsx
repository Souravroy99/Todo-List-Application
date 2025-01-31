import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextProvider } from './Context-API-Toast/Toast.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <ContextProvider>

    <React.StrictMode> 
      <App />
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition: Bounce
        bodyClassName="toastBody"
        />
    </React.StrictMode>,

  </ContextProvider>
)