import React from 'react'
import { assets } from './../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  return (
    <div className="flex items-center justify-between p-4 mb-2 absolute top-0 w-full">
      {/* Logo */}
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 cursor-pointer"
        onClick={() => navigate('/')}
      />

      {user ? (
        <div className='flex w-10 h-10 justify-center items-center bg-black text-white rounded-full relative group'>
          {user.name.charAt(0).toUpperCase()}
          
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>

            <ul className='list-none m-0 p-2 bg-gray-100 text-sm'>
              <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer' onClick={()=>navigate('/reset-password')}>Reset Password</li>
              <li className='py-1 px-2 hover:bg-gray-200 cursor-pointer text-red-500' onClick={()=> setUser(null)}>Logout</li>
              
            </ul>

          </div>

        </div>
      ) : (
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 border border-gray-400 rounded-full px-3 py-2 hover:bg-gray-200 transition-all"
        >
          Login
          <img src={assets.arrow_icon} alt="" className="w-3" />
        </button>
      )}
    </div>
  )
}

export default Navbar
