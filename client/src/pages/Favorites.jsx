import { useEffect, useState } from "react";
import API from "../api/axios";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useParams } from "react-router-dom";

export default function Favorites(){
  const { id } = useParams()
  const [favorites, setFavorites] = useState([])
  const [loading, setLoading] = useState(true)
  const [product, setProduct] = useState(null)


  const addToCart = async (productId) => {
       try {
         await API.post("/cart/add", {
            productId,
        })
        alert("Added to Cart")
       } catch (error) {
        alert("Error")
       }
    } 


    const removeFavorite = async (id) => {
       try {
         await API.delete(`/favorites/${id}`)
         setFavorites((prev) => prev.filter((item) => item._id !== id))
        alert("Remove from favorites")
       } catch (error) {
        alert("Error")
       }
    } 

  useEffect(() => {
    getFavorites()
  }, [])

  const getFavorites = async () => {
    try {
      const res = await API.get("/favorites")
      setFavorites(res.data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }

  if(loading) {
    return (
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
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10" >
          <div>
            <h1 className="text-5xl font-extrabold bg-linear-to-r from-pink-600 via-red-500
            to-orange-500 bg-clip-text text-transparent">My Favorites</h1>
            <p className="text-gray-500 mt-2">
              Save your favorite products for later.
            </p>
          </div>
          <div className="mt-5 md:mt-0 bg-white shadow-lg px-6 py-3 rounded-2xl">
            <span className="font-semibold text-pink-600">
              {favorites.length} Favorite Items
            </span>
          </div>
        </div>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-xl p-16 text-center">
            <Heart size={70} className="mx-auto text-pink-500 mb-5" />
            <h2 className="text-3xl font-bold text-gray-700">No Favorites yet</h2>
            <p className="text-gray-500 mt-3">
              Add products to yur fovorites to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {favorites
            .filter((item) => item.product)
            .map((item) => (
              <div key={item._id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-xl transition duration-500 overflow-hidden">
                <div className="overflow-hidden">
                  <img src={`http://localhost:5000/uploads/${item.product.image}`} 
                  alt={item.product.title}
                className="w-full object-contain group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-2">{item.product.title}</h2>
                  <div className="mt-4">
                    <span className="text-2xl font-bold text-green-600">
                      ₹ {item.product.price}
                    </span>
                  </div>
                  <button onClick={() => addToCart(item.product._id)} className="mt-6 w-full flex items-center justify-center gap-2 bg-pink-500
                  hover:bg-pink-600 text-white py-3 rounded-2xl transition duration-300 cursor-pointer">
                    <ShoppingCart size={20} className=""/> Add To Cart
                  </button>
                  <button onClick={() => removeFavorite(item._id)} className="mt-6 w-full flex items-center justify-center gap-2 bg-red-500
                  hover:bg-red-600 text-white py-3 rounded-2xl transition duration-300 cursor-pointer">
                    <Trash2 size={20} className=""/> Remove
                  </button>
                </div>
              </div>
              
            ))}
          </div>
        )}
      </div>
    </div>
  )
}