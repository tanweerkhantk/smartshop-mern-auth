import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Link, useLocation } from 'react-router-dom'
import API from '../api/axios'
import {  Menu, X, Heart, Home, HomeIcon, LogOut, ShoppingCart } from 'lucide-react'
import { useState } from 'react'


export default function Navbar(){
  const { user, logout, loading } = useAuth()
  const role = user?.role?.toLowerCase()
    const [cartCount, setCartCount] = useState(0)
    const [favoritesCount, setFavoritesCount] = useState(0)
    const [mobileMenu, setMobileMenu] = useState(false)

    const location = useLocation()

    const getCartCount = async () => {
      try {
        const res = await API.get("/cart")
        setCartCount(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }

    const getFavoritesCount = async () => {
      try {
        const res = await API.get("/favorites")
        setFavoritesCount(res.data.length)
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(() => {
      if(loading) return
      const loadData = async () => {
        if(!user){        
          setCartCount(0),
          setFavoritesCount(0)
          return
      }
      try {
        const [cartres, fevres] = await Promise.all([
          API.get("/cart"),
          API.get("/favorites")
        ])
        setCartCount(cartres.data?.length || 0)
        setFavoritesCount(fevres.data?.length || 0)
      } catch (error) {
        console.log(error)
      }
      }
      loadData()
      
    }, [user, loading, location.pathname])

    const closeMenu = () => setMobileMenu(false)

    

  return(
    <nav className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b
    border-white/10 text-white'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex items-center justify-between'>
        
        <Link to="/"
        className='text-xl font-bold tracking-widest text-white uppercase  hover:text-gray-300 transition'>
            Smart <span className='text-indigo-400'>Shop</span> 🛒
        </Link>
        <div className='hidden md:flex items-center gap-2 lg:gap-4 text-sm'>
           {/* {user && (
            <>
              <NavItem to="/login" highlight>Login</NavItem>
              <NavItem to="/register" highlight outline>Register</NavItem>
            </>
          )} */}

           {user && (
            <>
             <NavItem to="/"> <Home size={20}/> </NavItem>
            <NavItem to="/products"> Products</NavItem>
            </>
           )}
         
          {role === "user" && (
            <>
              <div className='relative'>
                <NavItem to="/cart"> <ShoppingCart size={20} /></NavItem>

                {cartCount > 0 && (
                  <span className='absolute -top-1 -right-2 bg-red-500 text-white text-xs
                  w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-bounce'>
                    {cartCount}
                  </span>
                )}
              </div>

              <div className='relative'>
                <NavItem to="/favorites"> <Heart size={20} /></NavItem>

                {favoritesCount > 0 && (
                  <span className='absolute -top-1 -right-2 bg-pink-500 text-white text-xs
                  w-5 h-5 flex items-center justify-center rounded-full shadow-lg animate-bounce'>
                    {favoritesCount}
                  </span>
                )}
              </div>
              {/* <NavItem to="/favorites"><Heart size={20} /></NavItem> */}
            </>
          )}

          {user?.role?.toLowerCase() === "admin" && (
            <>
              <NavItem to="/add-product">Add Products</NavItem>
              <NavItem to="/dashboard">Dashboard</NavItem>
              <NavItem to="/users">Manage Users</NavItem>
            </>
          )}


           {user && (
            <button onClick={logout} className='cursor-pointer p-2 rounded-full hover:bg-red-500/50 transition'>
               {/* bg-red-500 px-4 py-2 */}
              <LogOut size={16} />
              </button>

          )}
         
          {/* {user && (
            <NavItem to="/logout" outline>Logout</NavItem>
          )} */}

          {user && (
            <div className='hidden lg:flex items-center gap-3 bg-white shadow-lg rounded-full px-5 py-2
            border border-gray-200'>
              <div className='w-10 h-10 rounded-full bg-linear-to-r from-indigo-500 to-cyan-500
              flex items-center justify-center text-white font-bold text-lg'>
                {user.name.charAt(0).toLowerCase()}
              </div>
              <div>
                <p className='text-xs text-gray-500'>Welcome Back</p>
                <h2 className='font-semibold text-gray-800'>
                  {user.name}
                </h2>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu button*/}
        <button className='md:hidden p-2'
        onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu /> }
        </button>
      </div>
      {/* mobile menu */}
      {mobileMenu && (
        <div className='md:hidden bg-black/90 border-t border-white/10 px-4 py-4 flex flex-col gap-3'>
          {user && (
            <>
              <MobileItem to="/" onClick={closeMenu}>
                <Home size={17}/> Home
              </MobileItem>
              <MobileItem to="/products" onClick={closeMenu}>
                Products
              </MobileItem>
            </>
          )}

          {role === "user" && (
            <>
              <MobileItem to="/cart" onClick={closeMenu}>
                <ShoppingCart size={17}/> Cart ({cartCount})
              </MobileItem>
              <MobileItem to="/favorites" onClick={closeMenu}>
                <Heart size={17}/> Favorites ({favoritesCount})
              </MobileItem>
            </>
          )}
          {role === "admin" && (
            <>
              <MobileItem to="/add-product" onClick={closeMenu}>
                Add Product
              </MobileItem>
              <MobileItem to="/dashboard" onClick={closeMenu}>
                Dashboard
              </MobileItem>
              <MobileItem to="/users" onClick={closeMenu}>
                Manage Users
              </MobileItem>
            </>
          )}

          {user && (
            <button onClick={() => {
              logout()
              closeMenu()
            }}
            className='flex items-center gap-2 text-red-400 mt-2'>
              <LogOut size={17} /> Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

function NavItem ({ to, children, highlight = false, outline = false }){
  return(
    <Link to={to}
    className={
      `px-3 py-1.5 rounded-full transition-all duration-200 hover:scale-105
      ${
        highlight ? "bg-indigo-500 hover:bg-indigo-600 text-white shadow-md"
        : outline
        ? "border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white"
        : "text-gray-300 hover:text-white hover:bg-white/10"
      }
    `}>
      {children}
    </Link>
  )
}

function MobileItem({ to, children, onClick }){
  return(
    <Link to={to}
    onClick={onClick}
    className='flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10'>
      {children}
    </Link>
  )
}