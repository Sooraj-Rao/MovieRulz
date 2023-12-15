import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginSVG } from './SVG/Svg';
import { MovieContext } from './Context/Context';

const Header = ({ isAdmin }) => {
  const context = useContext(MovieContext)
  const { login } = context;
  return (
    <div className=' bg-slate-200  font-semibold md:px-10 p-2 h-20 flex justify-between items-center sticky top-0 header z-50'>
      <Link to={"/"}> <span className=' text-xl sm:text-4xl cursor-pointer'><span className=' text-red-800'>Movie</span>Rulz</span></Link>
      {login ?
        <div className='flex gap-2 text-xs sm:text-lg'>
          <Link to={"/addMovie"}><span className='p-2   sm:p-3 rounded  '>Add Movie</span></Link>
          <Link to={"/viewall"}><span className='p-2  sm:p-3 rounded'>View Movie</span></Link>
          {
            isAdmin &&
            <Link to={"/users"}><span className=' p-2  sm:p-3 rounded  '>Users</span></Link>
          }
        </div>
        :
        <Link to={"/login"}> <button className=' flex items-center gap-3 bg-blue-600 text-white py-2 px-3 rounded'>
          <span className=' text-lg uppercase '>Login</span>
          <span className=" ">
            {LoginSVG}
          </span>
        </button>
        </Link >
      }
    </div >
  )
}

export default Header