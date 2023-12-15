import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { where, getDocs, query, getDoc, doc } from 'firebase/firestore';
import { db, usersRef } from './Firebase/Firebase';
import bcrypt from 'bcryptjs'
import { failMessage } from './Constants';
import { PasswordSVG, PhoneSVG } from './SVG/Svg';
import { useCookies } from 'react-cookie';



const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [cookie, setCookie] = useCookies(['login', 'mob', 'name'])
  const [Input, setInput] = useState({
    mobile: "",
    password: ""
  })

  const login = async () => {
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', Input.mobile));
      const querySnapshot = await getDocs(quer);
      const userData = querySnapshot.docs.map((doc) => doc.data());
      const user = userData.find((_data) => {
        return bcrypt.compareSync(Input.password, _data.password);
      });
      if (!user) {
        return failMessage('Invalid Credentials!', 'error');
      } else {
        setCookie('login', user.password)
        setCookie('mobile', user.mobile)
        setCookie('name', user.name)
        failMessage('Login Succesfull!', 'success');
        setTimeout(() => {
          navigate('/')
        }, 3000);
      }

    } catch (error) {
      console.log(error);
      failMessage('Unable to Login!', 'info')
    }
    setLoading(false);
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...Input, [name]: value })
  }
  return (
    <section className="bg-slate-300">
      <div className=" container flex items-center justify-center  h-[calc(100vh-5rem)] px-6 mx-auto">
        <div className="w-full max-w-md shadow-[0px_0px_10px_1px] shadow-slate-400  rounded-md p-4">
          <h1 className=" text-center text-2xl">New here ? Signin Now </h1>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              {PhoneSVG}
            </span>
            <input name='mobile' value={Input.mobile} onChange={handleChange} type="number" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Phone number" />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              {PasswordSVG}
            </span>

            <input name='password' value={Input.password} onChange={handleChange} type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
          </div>


          <div className="mt-6">
            <button onClick={login} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {
                loading ?
                  <span className=' flex justify-center'>
                    <h1 className=' h-5 w-5 border-[3px] rounded-full border-blue-200 border-t-transparent animate-spin '></h1>
                  </span>
                  : 'Login'
              }
            </button>

            <div className="mt-6 text-center ">
              <Link to={'/signup'} className=" font-semibold text-sm text-blue-500 hover:underline ">
                Dont have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login