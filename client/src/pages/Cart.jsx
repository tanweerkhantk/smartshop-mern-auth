import { useEffect, useState } from "react";
import API from "../api/axios";
import { ShoppingCart, Trash2 } from "lucide-react";

export default function Cart(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCart()
  }, [])

  const getCart = async () => {
    try {
      const res = await API.get("/cart")
      setItems(res.data)
    } catch (error) {
      console.log(error)
    }finally {
      setLoading(false)
    }
  }

  const removeItem = async (id) => {
    await API.delete(`/cart/${id}`)
    getCart()
  }

  if(loading){
    return(
        <div className="min-h-screen flex justify-center items-center bg-linear-to-br
        from-indigo-300 via-white to-purple-200">
            <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent
            rounded-full animate-spin"></div>
        </div>
    )
  }

  return(
    <div className="min-h-screen bg-linear-to-br from-indigo-300 
    to-purple-300 py-12 px-6">
      <div className="flex items-center gap-3 mb-8">
        <ShoppingCart className="text-indigo-600" size={30}/>
        <h1 className="text-4xl font-extrabold text-gray-800">My Cart</h1>
      </div>

      {items.length === 0 ? (
        <div className="bg-white shadow-xl rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            Your cart is empty 🛒
          </h2>
          <p className="text-gray-500 mt-2">
            Add some products to them here
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item._id}
            className="group flex items-center justify-between bg-white/80 backdrop-blur-md
            border border-gray-100 shadow-lg rounded-2xl p-5 hover:shadow-2xl transition">
              <div className="flex items-center gap-4">
                <img src={`http://localhost:5000/uploads/${item.product?.image}`} 
                alt={item.product?.title} 
                className="w-20 h-20 object-contain rounded-xl shadow-md group-hover:scale-105 transition"/>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.product?.title}
                </h2>
                <p className="text-green-600 font-bold mt-1">
                   {item.product?.price}
                </p>
              </div>
              </div>

              <button onClick={() => removeItem(item._id)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white
                px-4 py-4 rounded-xl shadow-md transition hover:scale-105 cursor-pointer">
                  <Trash2 size={20} />
                  Remove
                </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}