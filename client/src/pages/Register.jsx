import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { toast } from 'react-toastify'

export default function Register(){
  const navigate = useNavigate()
  const[form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user"
  })

  const handleSubmit = async(e) => {
    e.preventDefault()

    //validation
    const name = form.name.trim()
    const email = form.email.trim()
    const password = form.password.trim()

    if(!name){
      return toast.error("Full name is required")
    }
    if(name.length < 3){
      return toast.error("Name must be 3 characters")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!email){
      return toast.error("Email is required")
    }
    if(!emailRegex.test(email)){
      return toast.error("Please enter a valid email address")
    }

    if(!password){
      return toast.error("Password is required")
    }

    if(password.length < 5){
      return toast.error("Password must be 5 characters")
    }

    if(!["user", "admin"].includes(form.role)){
      return toast.error("Invalid account type")
    }



    try {
      await API.post("/auth/register", form)
    toast.success("Registration Successful")

    navigate("/login")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Error"
      )
    }
  }

  return(
    <div className='flex items-center justify-center bg-linear-to-br
     from-black via-gray-900 to-indigo-950 px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl
        p-8 mt-4'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-white'>
              Create Account
            </h1>
            <p className='text-gray-400 mt-2'>
              Sign in to continue shopping
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm text-gray-300 mb-2'>
               Full Name
              </label>
              <input type='text'
              placeholder='Enter your full name'
              className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10
              text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500 transition' 
              onChange={(e)=> setForm({ ...form, name: e.target.value})}/>
            </div>

             <div>
              <label className='block text-sm text-gray-300 mb-2'>
                Email Address
              </label>
              <input type='email'
              placeholder='Enter your email'
              className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10
              text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500 transition' 
              onChange={(e)=> setForm({ ...form, email: e.target.value})}/>
            </div>

            <div>
              <label className='block text-sm text-gray-300 mb-2'>
                Password
              </label>
              <input type='password'
              placeholder='Enter your password'
              className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10
              text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500 transition' 
              onChange={(e)=> setForm({ ...form, password: e.target.value})}/>
            </div>

             <div>
              <label className='block text-sm text-gray-300 mb-2'>
                Account Type
              </label>
              <select
              className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10
              text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500 transition' 
              onChange={(e)=> setForm({ ...form, role: e.target.value})}>
                <option value="user" className='bg-gray-900'>User</option>
                <option value="admin" className='bg-gray-900'>Admin</option>
              </select>
            </div>

            <button type='submit'
            className='w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white
            cursor-pointer font-semibold transition duration-300 shadow-lg shadow-indigo-500/30'>Create Account</button>
          </form>
          <div className='mt-6 text-center text-gray-400 text-sm'>
           Already have an account? 
            <Link to="/login"
            className='text-indigo-400 hover:text-indigo-300 font-medium ml-[5px]'>Login</Link>
          </div>
        </div>
      </div>
     </div>
  )
}