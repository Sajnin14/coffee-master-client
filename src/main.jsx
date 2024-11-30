import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Add from './components/Add.jsx';
import Update from './components/Update.jsx';
import Home from './components/Home.jsx';
import Signin from './components/Auth/Signin.jsx';
import Signup from './components/Auth/Signup.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: "/",
        element: <App></App>,
        loader: () => fetch('http://localhost:5000/coffee')
      },
      {
        path:'/add',
        element: <Add></Add>
      },

      {
        path: '/update/:id',
        element: <Update></Update>,
        loader: ({params}) => fetch(`http://localhost:5000/coffee/${params.id}`)
      },
      {
        path: '/auth/signin',
        element: <Signin></Signin>
      },
      {
        path: '/auth/signup',
        element: <Signup></Signup>
      }

    ]
  },
  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
