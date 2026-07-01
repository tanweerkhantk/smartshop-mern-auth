import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify"


export default function AddProduct(){
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    
  })
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const submitHandler = async (e) => {
    e.preventDefault()

    if(!image) {
      toast.warning("Please select an image")
      return
    }
    try {
      const formData = new FormData()

    formData.append("title", form.title)
    formData.append("description", form.description)
    formData.append("price", form.price)
    formData.append("image", image)

    await API.post("/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
    toast.success("Product added successfully")
    navigate("/products")
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error in add product"
      )
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 via-blue-200 to-cyan-200
    flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <form onSubmit={submitHandler}
        className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-2">
            Add New Product
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Fill in the details to create a new product.
          </p>
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Product Title</label>
            <input type="text"
            placeholder="Enter product title"
            value={form.title} 
            onChange={(e) => setForm({ ...form, title: e.target.value})}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Product Description</label>
            <textarea rows="4"
            placeholder="Enter product description"
            value={form.description} 
            onChange={(e) => setForm({ ...form, description: e.target.value})}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Product Price ₹</label>
            <input type="number"
            placeholder="Enter product price"
            value={form.price} 
            onChange={(e) => setForm({ ...form, price: e.target.value})}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-semibold text-gray-700">Upload Product Image</label>
            <input type="file"
            accept="image/*"
            // placeholder="Enter product image"
            // value={form.image} 
            // onChange={(e) => setForm({ ...form, image: e.target.value})}
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>

             {image && (
              <div className="mt-4">
              <img src={URL.createObjectURL(image)} alt="Preview"
              className="w-40 object-cover rounded-lg border shadow"/>
              </div>
            )}

          </div>

          <button type="submit"
          className="w-full rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 py-3 text-lg
           cursor-pointer font-semibold text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300">
            ➕ Add Product
          </button>
        </form>
      </div>
    </div>
  )
}