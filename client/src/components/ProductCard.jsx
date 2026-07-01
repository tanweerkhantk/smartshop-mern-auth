import { Link } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Eye, Heart, Pencil, ShoppingCart, Trash2 } from "lucide-react"

export default function ProductCard({ product }){
    const { user } = useAuth()

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

    const deleteProduct = async () => {
        if(window.confirm("Delete Product?")){
            await API.delete(`/products/${product._id}`)
            window.location.reload()
        }
    }
    return(
        <div className="group w-96 overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-lg
        hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
            <div className="relative overflow-hidden">
                <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.title}
                className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-100" />
                <span className="absolute top-4 left-4 bg-linear-to-r from-indigo-600 to-purple-600
                text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                    ₹ {product.price}
                </span>
            </div>

            <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-2">
                    {product.title}
                </h2>
                <p className="text-gray-500 mt-2 text-sm line-clamp-2">
                    {product.description}
                </p>

                <div className="grid grid-cols-3 gap-2 mt-6">
                    <Link 
                    to={`/products/${product._id}`}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 
                    text-white px-4 py-2 rounded-xl transition duration-300">
                        <Eye size={20} /> View
                    </Link>
                    {user?.role === "user" && (
                        <>
                            <button onClick={addToCart}
                            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600
                            text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer">
                                <ShoppingCart size={20} /> Cart
                            </button>
                            <button onClick={addToFevorite}
                            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600
                            text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer">
                                <Heart size={20} /> Favorite
                            </button>
                        </>
                    )}

                    {user?.role === "admin" && (
                        <>
                            <Link 
                            to={`/edit-product/${product._id}`}
                            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 
                            text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer">
                                <Pencil size={20} /> Edit
                            </Link>
                            <button onClick={deleteProduct}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600
                            text-white px-4 py-2 rounded-xl transition duration-300 cursor-pointer">
                                <Trash2 size={20} /> Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}