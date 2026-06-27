import React from 'react'
import { FaFacebookF } from 'react-icons/fa'
// import { authClient } from '../lib/auth-client'
// import toast from 'react-hot-toast'

const Facebook = () => {
  // const handleFacebookLogin = async () => {
  //   try {
  //     await authClient.signIn.social({
  //       provider: 'facebook',
  //       callbackURL: 'http://localhost:3000',
  //     })
  //   } catch {
  //     toast.error('Facebook login failed')
  //   }
  // }
  return (
    <button
      
      // onClick={handleFacebookLogin}
      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-/[#008744] bg-[#006f37] active:bg-[#00592c] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
    >
      <FaFacebookF className="text-white  hover:text-green-900 text-xl" />
      Continue with Facebook
    </button>
  )
}

export default Facebook
