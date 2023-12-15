import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { LoginSVG } from './SVG/Svg';
import { MovieContext } from './Context/Context';

const Header = () => {
  const context = useContext(MovieContext)
  const { login } = context;
  return (
    <div className=' bg-slate-200 text-4xl font-semibold md:px-10 p-2 h-20 flex justify-between items-center sticky top-0 header z-10'>
      <Link to={"/"}> <span className=' cursor-pointer'><span className=' text-red-800'>Movie</span>Rulz</span></Link>
      {login ?
        <Link to={"/AddMovie"}> <button><h1 className='mr-2 text-white' /><span className=' text-white'>Add Movie</span></button></Link>
        :
        <Link to={"/Login"}> <button className=' flex items-center gap-3 bg-blue-600 text-white py-2 px-3 rounded'>
          <span className=' text-lg uppercase '>Login</span>
          <span className=" ">
            {LoginSVG}
          </span>
        </button></Link >
      }
    </div >
  )
}

export default Header