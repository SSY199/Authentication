import React from 'react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../store/authStore.js'
import { formatDate } from '../utils/date.js';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const {user, logout} = useAuthStore();

  const handleLogout = () => {
    // Implement logout functionality here
    logout();
    toast.success('Logged out successfully!');

    console.log('Logout clicked');

  }

  return (
    <motion.div
      initial={{ opacity:0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      exit={{ opacity: 0, scale: 0.9 }}
      className='max-w-md w-full mx-auto p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
    >
      <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
        Welcome to Your Dashboard
      </h2>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700"
        >
          <h3 className='text-xl font-semibold text-green-500 mb-2'>Profile Information</h3>
          <p className="text-gray-300 font-bold">Name: {user.name}</p>
          <p className="text-gray-300 font-bold">Email: {user.email}</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-6 bg-gray-800 rounded-lg shadow-md border border-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-lg"
        >
          <h3 className='text-xl font-semibold text-green-500 mb-2'>Recent Activity</h3>
          <p className="text-gray-300">
            <span className="font-bold">Joined: </span>
            {new Date(user.createdAt).toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
          <p className="text-gray-300">
            <span className="font-bold">Last Login: </span>
            {
              user.lastLogin ? formatDate(new Date(user.lastLogin).toLocaleDateString("en-US", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })) : 'You just signed up!'
            }
          </p>
        </motion.div>
          
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8 text-center"
      >
        <motion.button
          className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'

          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
        </motion.div>
    </motion.div>
  )
}

export default Dashboard