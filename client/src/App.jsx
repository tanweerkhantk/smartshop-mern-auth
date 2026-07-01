import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Favorites from './pages/Favorites'
import AddProduct from './pages/AddProduct'
import EditProduct from './pages/EditProduct'
import Dashboard from './pages/Dashboard'
import ManageUsers from './pages/ManageUsers'

function App() {
 

  return (
  <BrowserRouter>
  <div className='min-h-screen flex flex-col bg-black'>
    <Navbar />
    <main className='flex-1'>
    <Routes>
      <Route path='/' element={
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>
        }/>
      <Route path='/login' element={<Login />}/>
      <Route path='/register' element={<Register />}/>

      <Route path='/products' element={
        <ProtectedRoute>
        <Products />
        </ProtectedRoute>
        }/>

        <Route path='/products/:id' element={
        <ProtectedRoute>
        <ProductDetails />
        </ProtectedRoute>
        }/>

        <Route path='/cart' element={
        <ProtectedRoute>
        <Cart />
        </ProtectedRoute>
        }/>

        <Route path='/favorites' element={
        <ProtectedRoute>
        <Favorites />
        </ProtectedRoute>
        }/>

        <Route path='/add-product' element={
        <AdminRoute>
        <AddProduct />
        </AdminRoute>
        }/>

        <Route path='/edit-product/:id' element={
        <AdminRoute>
        <EditProduct />
        </AdminRoute>
        }/>

         <Route path='/dashboard' element={
        <AdminRoute>
        <Dashboard />
        </AdminRoute>
        }/>

         <Route path='/users' element={
        <AdminRoute>
        <ManageUsers />
        </AdminRoute>
        }/>

    </Routes>
    </main>
    <Footer />
    </div>
  </BrowserRouter>
  )
}

export default App
