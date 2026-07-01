import { Link } from 'react-router-dom'

export default function Home(){
  return(
    <div className="min-h-screen bg-linear-to-b from-black via-gray-900 to-black text-white
    ">
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-20 flex flex-col text-center items-center">
        <div className="relative bg-white/5 border border-white/10 backdrop-blur-md p-10 md:p-16
        rounded-3xl shadow-xl overflow-hidden">
          <div className='absolute -top-20 -left-20 w-72 h-72 bg-indigo-500/20 blur-3xl
          rounded-full' />
            <div className='absolute -bottom-20 -right-20 w-72 h-72 bg-purple-500/20 blur-3xl
          rounded-full' />
            <div className='relative z-10'>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome To{" "} <span className="text-transparent bg-clip-text bg-gradient-to-r 
            from-indigo-400 to-purple-500">Smart Shop 🛒</span>
          </h1>
          
          
           <p className="mt-5 text-gray-300 text-lg md:text-xl">
              Discover Best Product at Affordable Prices
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products"
              className='px-6 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 
               hover:scale-105 transition transform font-semibold shadow-lg text-white
              '>Shop Now</Link>
            </div>
        </div>

      </div>
      </div>
      
      <div className='max--w-7xl mx-auto px-6 pb-20 grid md:grid-cols-3 gap-6'>
        <FeatureCard 
        title="Fast Delivery"
        desc="Get products delivered quickly and safely to your doorstep."
        />
        <FeatureCard 
        title="Vest Price"
        desc="We offer competitive pricing on all best products."
        />
        <FeatureCard 
        title="Secure Payment"
        desc="Best system for Safe Payment"
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, desc }){
  return(
    <div className='bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10
    transition'>
      <h3 className='text-xl font-semibold text-white'>{title}</h3>
      <p className='mt-3 text-gray-400 text-sm'>{desc}</p>
    </div>
  )
}