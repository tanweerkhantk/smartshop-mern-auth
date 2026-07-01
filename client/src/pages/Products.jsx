import React, { useEffect, useState } from 'react'
import API from '../api/axios'
import { Search } from 'lucide-react'
import ProductCard from '../components/ProductCard'

export default function Products () {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts()
  }, [])

  useEffect(() => {
    const filtered = products.filter((product) => 
    product.title.toLowerCase().includes(search.toLowerCase()))
    setFilteredProducts(filtered)
  }, [search, products])

  const getProducts = async () => {
    try {
      const res = await API.get("/products")
      console.log(res.data)
      setProducts(res.data)
      setFilteredProducts(res.data)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen bg-linear-to-br from-indigo-300 via-white to-purple-300'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-5 mb-10
        '>
          <h1 className='text-5xl font-extrabold bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text
          text-transparent'>Explore Products</h1>
          <p className='text-gray-500 mt-2'>
            Discover amazing products at the best prices
          </p>
        </div>
        <div className='bg-white shadow-lg rounded-full px-6 py-3'>
          <span className='font-semibold text-indigo-600'>
            {filteredProducts.length} Products
          </span>
        </div>
      </div>

      <div className='relative mb-8'>
        <Search size={20} className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />
        <input type='text' placeholder='Search Products...'
        className='w-full bg-white shadow-md rounded-xl sm:rounded-2xl py-3 pl-12 pr-4 outline-none border
        border-gray-200 focus:ring-4 focus:ring-indigo-200 transition'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className='flex justify-center items-center sm:h-80'>
          <div className='w-12 h-12 sm:w-14 sm:h-14 border-4 border-indigo-500 
          border-t-transparent rounded-full animate-spin'></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className='bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 text-center'>
          <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700'>No Product Found</h2>
          <p className='text-gray-500 mt-3 text-sm sm:text-base'>Try Searching with another keyword</p>
        </div>
      ) : (
        <div className='grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4
        place-items-center sm:place-items-stretch'>
          {/* xl:grid-cols-3 p-4 */}
          {filteredProducts.map((product) => (
            <ProductCard key={product._id}
            product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
