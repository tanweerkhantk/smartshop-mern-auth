import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import API from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { toast } from 'react-toastify'

export default function Login(){
  const navigate = useNavigate()
  const{ setUser, getProfile} = useAuth()
  const[form, setForm] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {


      // if email and password is blank
      if(!form.email.trim() || !form.password.trim()){
        alert("Please enter email and password.")
      }


      const response = await API.post("/auth/login", form)
    localStorage.setItem("token", response.data.token)

    if(response.data.user){
      setUser(response.data.user)
    }else{
      await getProfile()
    }

    toast.success("Login Successful")

    navigate("/")
    } catch (error) {
      console.log("Login Error", error)
      toast.error(
        error.response?.data?.message || "Login Error"
      )
    }
  }
return(
    <div className='flex items-center justify-center bg-linear-to-br
     from-black via-gray-900 to-indigo-950 px-4 py-12'>
      <div className='w-full max-w-md'>
        <div className='bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl
        p-8'>
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-white'>
              Welcome Back
            </h1>
            <p className='text-gray-400 mt-2'>
              Sign in to continue shopping
            </p>
          </div>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div>
              <label className='block text-sm text-gray-300 mb-2'>
                Email Address
              </label>
              <input type='email'
              placeholder='Enter your email'
              required
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
              required
              placeholder='Enter your password'
              className='w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10
              text-white placeholder-gray-500 outline-none focus:ring-2 focus:ring-indigo-500
              focus:border-indigo-500 transition' 
              onChange={(e)=> setForm({ ...form, password: e.target.value})}/>
            </div>
            <button type='submit'
            className='w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white
            font-semibold transition duration-300 shadow-lg shadow-indigo-500/30 cursor-pointer'>Login</button>
          </form>
          <div className='mt-6 text-center text-gray-400 text-sm'>
            Don't have an account?
            <Link to="/register"
            className='text-indigo-400 hover:text-indigo-300 font-medium ml-[5px]'>Register</Link>
          </div>
        </div>
      </div>
     </div>
  )
  
}