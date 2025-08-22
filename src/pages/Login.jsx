import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axios from 'axios'
import { useAuth } from '../context/AuthContext';

const Login = () => {

    const navigate = useNavigate();
    const {setUser} = useAuth();

    const [state,setState] = useState('Sign Up');

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            if(state==='Sign Up'){
                const res = await axios.post('https://authentication-backend-crmb.onrender.com/api/auth/register',{
                    name,email,password
                },{withCredentials:true});
                console.log('Registration Response:',res.data);
                setUser({name: res.data.user.name, email: res.data.user.email});
            }
            else{
                const res = await axios.post('https://authentication-backend-crmb.onrender.com/api/auth/login',{
                    email,password
                },{withCredentials:true});
                console.log('Login Response:',res.data);
                setUser({name: res.data.user.name,email: res.data.user.email})
            }
            toast.success(`${state} successful!`);
            navigate('/');
        } catch (error) {
            console.error('Server error', error.message);
        }
    }


  return (
    <div className='flex flex-col items-center justify-center bg-gradient-to-br from-indigo-300 to-blue-500 min-h-screen'>
        <img src={assets.logo} alt="" onClick={()=>navigate('/')} className='cursor-pointer w-36 p-5 absolute left-5 top-5'/>
        <div className='flex flex-col items-center justify-center max-w-md w-full bg-slate-800 rounded-lg p-10'>
            <h2 className='font-bold text-2xl mb-3 text-white'>{state==='Sign Up'?'Create Account':'Login Account'}</h2>
            <p className='font-bold text-xl mb-3 text-white'>{state==='Sign Up'? 'Create your Account':'Login to your Account'}</p>

            <form onSubmit={handleSubmit}>
                {state==='Sign Up' && (
                    <div className='flex items-center gap-4 justify-center bg-[#333A47] px-4 py-2 rounded-lg mb-3'>
                    <img src={assets.person_icon} alt="" />
                    <input 
                        type="text"
                        placeholder='Enter your name' required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className='bg-transparent outline-none text-white'
                    />
                </div>
                )}
                <div className='flex items-center gap-4 justify-center bg-[#333A47] px-4 py-2 rounded-lg mb-3'>
                    <img src={assets.mail_icon} alt="" />
                    <input 
                        type="text"
                        placeholder='Youremail@gmail.com' required
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        className='bg-transparent outline-none text-white'
                    />
                </div>
                <div className='flex items-center gap-4 justify-center bg-[#333A47] px-4 py-2 rounded-lg mb-3'>
                    <img src={assets.lock_icon} alt="" />
                    <input 
                        type="password"
                        placeholder='Type your password' required
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        className='bg-transparent outline-none text-white'
                    />
                </div>
                {state==='Login' && (
                    <div className='mb-3 cursor-pointer text-blue-600 hover:underline transition-all'>
                    <p onClick={()=> navigate('/reset-password')}>Forget your password?</p>
                </div>
                )}
                <button className='w-full border border-white px-5 py-3 text-white rounded-full bg-green-500 font-semibold text-lg hover:bg-green-600 transition mb-2'>Submit</button>
            </form>


            {state==='Sign Up'? (
                <p className='text-white font-medium'>Already have an Account. {' '}
                <span onClick={()=> setState('Login')}
                    className='text-indigo-500 cursor-pointer hover:underline transition-all'>Login Here</span>
            </p>
            ) : (
                <p 
                    className='text-white font-medium'>Don't have an Account. {' '}
                <span onClick={()=> setState('Sign Up')} className='text-indigo-500 cursor-pointer hover:underline transition-all'>Sign Up</span>
            </p>
            )}
            
        </div>
    </div>
  )
}

export default Login
