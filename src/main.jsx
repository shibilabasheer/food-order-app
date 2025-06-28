import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import Layout from './components/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Store } from './redux/store.js'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Category from './components/Category.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ],
  },

  {
    path: "home",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
    ],
  },

  {
    path: "category/:id", 
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Category/>
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'admin',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AdminDashboard />
          },
        ],
      },
      {
        path: 'profile',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ProfilePage />
          },
        ],
      }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)

