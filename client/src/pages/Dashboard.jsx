import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Dashboard(){
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalCartItems: 0,
  })

  useEffect(() => {
    getStats()
  }, [])

  const getStats = async () => {
    const res = await API.get("/admin/dashboard")
    setStats(res.data)
  }
  return(
    <div className="min-h-screen bg-linear-to-br from-slate-200 via-blue-200 to-indigo-200 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-800">Admin DashBoard</h1>
          <p className="text-gray-500 text-lg">
            Welcome back! Here's a quick overview of your store.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-linear-to-r from-blue-600 to-cyan-500 text-white rounded-3xl
          p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">👤</div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-5xl font-bold mt-4">
              {stats.totalUsers}
            </p>
          </div>

          <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-3xl
          p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">📦</div>
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-5xl font-bold mt-4">
              {stats.totalProducts}
            </p>
          </div>

          <div className="bg-linear-to-r from-pink-500 to-red-600 text-white rounded-3xl
          p-8 shadow-xl hover:scale-105 transition duration-300">
            <div className="text-5xl mb-4">🛒</div>
            <h2 className="text-xl font-semibold">Cart Items</h2>
            <p className="text-5xl font-bold mt-4">
              {stats.totalCartItems}
            </p>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">DashBoad Summary</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-100 rounded-2xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-500">Registered Users</p>
              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {stats.totalUsers}
              </h3>
            </div>

            <div className="bg-green-100 rounded-2xl p-6 border-l-4 border-green-500">
              <p className="text-gray-500">Available Products</p>
              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {stats.totalProducts}
              </h3>
            </div>

            <div className="bg-red-100 rounded-2xl p-6 border-l-4 border-red-500">
              <p className="text-gray-500">Items in Cart</p>
              <h3 className="text-3xl font-bold text-red-600 mt-2">
                {stats.totalCartItems}
              </h3>
            </div>
            
          </div>
        </div>

        <div className="mt-10 text-center text-gray-500">
          Copyright &copy; Build with React & tailwind CSS
        </div>
      </div>
    </div>
  )
}