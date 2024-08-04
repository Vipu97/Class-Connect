import React from 'react'
import { Link } from 'react-router-dom';

const AuthHeader = ({text}) => {
  return (
    <div className="px-2 py-3 flex justify-between xs:px-10 mb-4">
        <Link to={"/"}>
          <h1 className="text-blue font-black text-[25px] z-50 relative">
            wooclap
          </h1>
        </Link>
        <Link to={text === 'Login' ? '/login' : '/register'}
          className="py-2 px-4 font-black text-md border-2 border-gray-300 text-[#1d254f]
         hover:bg-[#eff6ff] rounded-3xl z-50"
        >
          {text}
        </Link>
    </div>
  )
}

export default AuthHeader