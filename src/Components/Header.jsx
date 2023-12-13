import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppState=useContext(Appstate)
  return (
    <div className=' bg-slate-200 text-4xl font-semibold md:px-10 p-2 h-20 flex justify-between items-center sticky top-0 header z-10'>
       <Link to={"/"}> <span className=' cursor-pointer'><span className=' text-red-800'>Movie</span>Rulz</span></Link>
       {useAppState.login ?
       <Link to={"/AddMovie"}> <button><h1 className='mr-2 text-white'/><span className=' text-white'>Add Movie</span></button></Link>
      :
      <Link to={"/Login"}> <button><span className=' text-white'>Login</span><h1 className='ml-2 text-white'/></button></Link>
      }
</div>
  )
}

export default Header