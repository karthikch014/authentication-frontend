import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Step 1 → Send OTP
  const handleSendOtp = async () => {
    try {
      const res = await axios.post("https://authentication-backend-crmb.onrender.com/api/auth/send-otp", { email });
      toast.success(res.data.message);
      setStep(2); // move to OTP entry step
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // Step 2 → Reset password
  const handleResetPassword = async () => {
    try {
      const res = await axios.post("https://authentication-backend-crmb.onrender.com/api/auth/reset-password", {
        email, otp, newPassword
      });
      toast.success(res.data.message);
      navigate('/login'); // redirect to login after success
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 to-blue-500 min-h-screen w-full cursor-pointer'>
      <img src={assets.logo} alt="" onClick={()=> navigate('/')} className='absolute top-5 left-5 w-36'/>
      
      {/* Step 1 → Email */}
      {step === 1 && (
        <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg p-10 min-w-md'>
          <h2 className='text-white font-bold text-3xl mb-2'>RESET PASSWORD</h2>
          <p className='text-white font-semibold text-xl mb-3'>Enter your e-mail address</p>
          <div className='flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg mb-3'>
            <img src={assets.mail_icon} alt="" />
            <input 
              type="email" 
              placeholder='youremail@gmail.com'
              className='outline-none bg-transparent text-white'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button 
            onClick={handleSendOtp}
            className='border border-white bg-green-500 text-white w-full rounded-full px-4 py-2 hover:bg-green-600 transition-all cursor-pointer'
          >
            Send OTP
          </button>
        </div>
      )}

      {/* Step 2 → OTP + New Password */}
      {step === 2 && (
        <div className='flex flex-col items-center justify-center bg-slate-800 rounded-lg p-10 min-w-md'>
          <h2 className='text-white font-bold text-3xl mb-2'>Enter OTP</h2>
          <p className='text-white font-semibold text-xl mb-3'>Check your email for the OTP</p>

          <div className='flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg mb-3'>
            <input 
              type="text" 
              placeholder='Enter OTP'
              className='outline-none bg-transparent text-white'
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          <div className='flex items-center gap-3 bg-gray-700 px-4 py-2 rounded-lg mb-3'>
            <input 
              type="password" 
              placeholder='New Password'
              className='outline-none bg-transparent text-white'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <button 
            onClick={handleResetPassword}
            className='border border-white bg-blue-500 text-white w-full rounded-full px-4 py-2 hover:bg-blue-600 transition-all cursor-pointer'
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  )
}

export default ResetPassword
