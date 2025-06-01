import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Mail, Lock, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import Input from './Input';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuthStore();

  const handelLogin = async (e) => {
    e.preventDefault();
    console.log('Login attempted with:', { email, password });
    const user = await login(email, password);
    if (user) {
      console.log('Login successful:', user);
    } else {
      console.error('Login failed: User not found or incorrect credentials');
    }

  }


  return (
    <motion.div
     initial={{ opacity:0, y: 20}}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
     className='max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
    >
      <div className="p-8">
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text'>
          WELCOME BACK
        </h2>
        <form action="" onSubmit={handelLogin}>
          <Input 
          Icon={ Mail }
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
          <Input
          Icon={ Lock }
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
          <div className="flex items-center mb-6">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:ring-2 focus: ring-green-500 focus:ring-offset-2  transition duration-200 flex items-center justify-center"
          type="submit"
          disabled={loading}
          >
            {loading ? <Loader className='w-6 h-6 animate-spin text-center mx-auto' /> : "Login"}
          </motion.button>
        </form>
      </div>

      <div className="px-8 py-4 bg-gray-900 flex justify-center">
        <p className="text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  )
}

export default LoginPage