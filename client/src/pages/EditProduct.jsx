import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";


export default function EditProduct(){
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    
  })

  const [image, setImage] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = async () => {
    const res = await API.get(`/products/${id}`)
    setForm(res.data)
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append("title", form.title)
    formData.append("description", form.description)
    formData.append("price", form.price)

    if(image) {
      formData.append("image", image)
    }
    await API.put(`/products/${id}`, formData)
    navigate("/products")
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-300 via-blue-200 to-cyan-200
    flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <form onSubmit={submitHandler}
        className="bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-8 border border-white">
          <h2 className="text-4xl font-bold text-center text-indigo-700 mb-2">
            Edit Product
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Update the product information below.
          </p>
          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Product Title</label>
            <input type="text"
            placeholder="Enter product title"
            value={form.title || ""} 
            onChange={(e) => setForm({ ...form, title: e.target.value})}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Product Description</label>
            <textarea
            rows="4"
            placeholder="Enter product description"
            value={form.description || ""} 
            onChange={(e) => setForm({ ...form, description: e.target.value})}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="mb-5">
            <label className="block mb-2 font-semibold text-gray-700">Product Price ₹</label>
            <input type="number"
            placeholder="Enter product price"
            value={form.price || ""} 
            onChange={(e) => setForm({ ...form, price: e.target.value})}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="mb-8">
            <label className="block mb-2 font-semibold text-gray-700">Product Image URL</label>
            
            {form.image && (
              <img src={`http://localhost:5000/uploads/${form.image}`} alt="{form.title)"
              className="w-40 object-cover rounded-lg mb-4 border"/>
            )}
            
            <input type="file"
            // placeholder="Enter product image"
            // value={form.image || ""} 
            // onChange={(e) => setForm({ ...form, image: e.target.value})}
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4
            focus:border-indigo-500 outline-none transition"/>
          </div>

          <div className="flex gap-4">
              <button type="button" onClick={() => navigate("/products")}
                className="w-1/2 py-3 text-lg rounded-xl border border-gray-300
                font-semibold hover:bg-gray-200 transition cursor-pointer">
                  Back
            </button>
            <button type="submit"
                className="w-1/2 rounded-xl bg-linear-to-r from-indigo-600 to-cyan-500 py-3 text-lg
                font-semibold cursor-pointer text-white shadow-lg hover:scale-[1.02] hover:shadow-xl transition duration-300">
                  ✏️ Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}