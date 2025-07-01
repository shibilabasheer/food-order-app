import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from 'react-redux'
import Layout from './components/Layout.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx'
import { Store } from './redux/store.js'
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Category from './components/Category.jsx';
import Order from './pages/Order.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import Products from './pages/admin/Products.jsx';
import DishCart from './pages/DishCart.jsx';
import AllOrders from './pages/admin/AllOrders.jsx';
import AllUsers from './pages/admin/AllUsers.jsx';

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
        element: <Category />
      },
    ],
  },

  {
    path: "cart",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <DishCart />
      },
    ],
  },
  {
    path: "order",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Order />
      },
    ],
  },
  {
    path: "orderHistory",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <OrderHistory />
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'products',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Products />
          },
        ],
      },
      {
        path: 'allorders',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AllOrders />
          },
        ],
      },
      {
        path: 'allusers',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <AllUsers />
          },
        ],
      },
      {
        path: 'adminprofile',
        element: <AdminLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <ProfilePage />
          },
        ],
      },
      {
        path: 'profile',
        element: <Layout />,
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

