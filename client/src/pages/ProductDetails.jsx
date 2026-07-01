import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import { Heart, ShoppingCart, Truck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function ProductDetails(){
    const { user } = useAuth()
    const { id } = useParams()

    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)


    const addToCart = async () => {
        await API.post("/cart/add", {
            productId: product._id,
        })
        alert("Added to Cart")
    }
    const addToFevorite = async () => {
        await API.post("/favorites/add", {
            productId: product._id,
        })
        alert(" Added to Favourites")
    }

    useEffect(() => {
        getProduct()
    }, [id])


     const getProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`)
    //   console.log(res.data)
      setProduct(res.data)
    } catch (err){
      console.log(err)
    }
    finally {
      setLoading(false)
    }
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
    <div className="min-h-screen bg-linear-to-br grom-indigo-300 via-white to-purple-200 py-12 px-6">
        <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-10">
                <div className="p-8 bg-gray-100 flex justify-center overflow-hidden">
                    <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title} 
                    className="rounded-3xl w-full max-h-[550px] object-contain transition 
                    duration-700 hover:scale-105"/>
                </div>

                <div className="p-10">
                    <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full
                    font-semibold">
                        Best Product
                    </span>
                    <h1 className="text-5xl font-bold text-gray-800 mt-5"> {product.title} </h1>
                    <div className="mt-6">
                        <span className="text-5xl font-extrabold text-green-600">₹ {product.price}</span>
                    </div>
                    <p className="text-gray-600 text-lg mt-6 leading-8">
                        {product.description}
                    </p>

                    <div className="space-y-4 mt-8">
                        <div className="flex items-center gap-3">
                            <Truck className="text-green-600" />
                            <span>Free Delivery Available</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
                        {user?.role === "user" && (
                        <>
                            <button onClick={addToCart}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600
                            text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer">
                                <ShoppingCart size={20} /> Add to Cart
                            </button>
                            <button onClick={addToFevorite}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600
                            text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer">
                                <Heart size={20} /> Add to Fav
                            </button>
                        </>
                    )}
                        <button className="bg-linear-to-br from-green-500 to-emerald-600 text-white
                        px-8 py-4 rounded-2xl shadow-lg transition cursor-pointer">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}