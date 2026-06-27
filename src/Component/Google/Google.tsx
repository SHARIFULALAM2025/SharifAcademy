import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { authClient } from '../lib/auth-client';
import toast from 'react-hot-toast';

const Google = () => {
   const handleGoogleLogin = async () => {
     try {
       await authClient.signIn.social({
         provider: 'google',
         callbackURL:
           process.env.NEXT_PUBLIC_BETTER_AUTH_URL_Front_end ||
           'http://localhost:3000',
       })
     } catch  {
       toast.error('Google login failed')
     }
   }

    return (
      <div>
        <button
          onClick={handleGoogleLogin}
          className="inline-flex items-center justify-center gap-2 px-4 py-3 w-full bg-[#008744] hover:bg-[#006f37] active:bg-[#00592c] text-white text-sm font-semibold rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ease-in-out cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          <FaGoogle className="text-white  hover:text-green-900 text-xl" />
          Continue with Google
        </button>
      </div>
    )
};

export default Google;