  import React from 'react'
  import { assets } from '../assets/assets'
  import { useNavigate } from 'react-router-dom'
  import { useAuth } from '../context/AuthContext'


  const Header = () => {

    const capitalFirst = (str)=>{
      if(!str) return "";
      return str.charAt(0).toUpperCase()+str.slice(1);
    }
    const navigate = useNavigate();
    const {user} = useAuth();

    return (
      <div className='flex flex-col items-center text-center absolute'>
          <img src={assets.header_img} alt="" className='w-36 h-36 mb-3 rounded-full'/>
          <h1 className='flex font-bold text-3xl mb-2 gap-2'>Welcome {user ? capitalFirst(user.name) : "Developer"} <img src={assets.hand_wave} alt="" className='w-9 aspect-square'/></h1>
          <h2 className='text-xl mb-3'>Thank you for visiting our site. Sign In to view the full potential!</h2>
          <button onClick={()=>navigate('/login')}
            className='border border-gray-300 rounded-full px-4 py-3 hover:bg-gray-400 transition-all'>Get Started</button>
      </div>
    )
  }

  export default Header