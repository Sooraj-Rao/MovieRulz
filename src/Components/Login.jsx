import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { where,getDocs, query } from 'firebase/firestore';
import { usersRef } from './Firebase/Firebase';
import bcrypt from 'bcryptjs'
import { Appstate } from '../App';


const Login = () => {
  const navigate=useNavigate(); 
  const useAppState=useContext(Appstate);
    const [loading,setLoading]=useState(false)
    const [form,setForm]=useState({
      mobile:"",
      password:""
    })

    const login=async()=>{
      setLoading(true);
      try {
        const quer=query(usersRef,where('mobile','==',form.mobile))
        const querySnapshot=await getDocs(quer);
        querySnapshot.forEach((doc)=>{
          const _data=doc.data()
          const isUser=bcrypt.compareSync(form.password,_data.password);
          console.log("Logeed");
          if(isUser){
            useAppState.setLogin(true);
            useAppState.setUserName(_data.name);
            swal({
              title:"Login Successfull",
              icon:"success",
              buttons:false,
              timer:2000
            })  
            navigate('/')
          }else{
            swal({
              title:"invalid Credentials",
              icon:"error",
              buttons:false,
              timer:2000
          })  
          }
        })
   
      } catch (error) {
        swal({
          title:error.message,
          icon:"error",
          buttons:false,
          timer:2000
      })  
      }
      setLoading(false);
    }
  return (
    <div className="Login">
      <h1 className="text-center text-2xl my-5 font-semibold">Login</h1>
      <div className="h-30 md:flex md:justify-evenly md:w-2/3 flex flex-col items-center my-3">
        <div>
          <p>Phone Number</p>
          <br />
          <input
          required
            className=" h-12 pl-2 text-xl font-bold  bg-slate-900 -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
            value={form.mobile}
            onChange={(e)=>setForm({...form,mobile:e.target.value})} 
            type="number"
          />
        </div>
        <div>
          <p>Password</p>
          <br />
          <input
          required
            className="  h-12 pl-2 text-xl font-bold  bg-slate-900  -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
            value={form.password}
            onChange={(e)=>setForm({...form,password:e.target.value})}
            type="password"
          />
        </div>
        <div className="md:w-96 w-60 mt-5 " >
            <button onClick={login} className="rounded w-full my-2 text-xl h-11 bg-blue-950">
              {loading ? <span className="flex justify-center"> <TailSpin height={25}  color="white"/></span> : 'Login'}
            </button>
          </div>
            <div className='mt-3'>
                <h4>Dont have an Acoount ? <Link to={"/Signup"}><span className=' text-blue-400 font-extrabold cursor-pointer'> Sign Up</span></Link></h4>
            </div>
      </div>
    </div>
  )
}

export default Login