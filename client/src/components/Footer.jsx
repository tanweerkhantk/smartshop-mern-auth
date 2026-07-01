export default function Footer(){
  return(
    <footer className="mt-16 bg-black/90 border-t border-white/10 text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Smart  <span className='text-indigo-400'>Shop</span>
          </h2>
          <p className="mt-2 text-sm text-gray-400 leading-relaxed">
            A modern full stack ecommerce exprerience build with MERN Stack
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold text-center mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-center">
            <li><a href="/" className="hover:text-indigo-400 transition">Home</a></li>
            <li><a href="/products" className="hover:text-indigo-400 transition">Product</a></li>
            <li><a href="/cart" className="hover:text-indigo-400 transition">Cart</a></li>
            <li><a href="/login" className="hover:text-indigo-400 transition">Login</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Update</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get Updates on new products & offers
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-gray-500">
        Copyright &copy; {new Date().getFullYear()} MERN Ecommerce Store. All rights reserved.</div>
    </footer>
  )
}