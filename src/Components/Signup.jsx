import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { usersRef } from "./Firebase/Firebase";
import bcrypt from 'bcryptjs'
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "./Firebase/Firebase";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";

const auth = getAuth(app);

const SignUp = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
      }
    }, auth);
  }

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

const verifyOtp=()=>{
try {
  setLoading(true);
  window.confirmationResult.confirm(OTP).then((result)=>{
     uploadData();
    swal({
      text:"Sucessfully registered",
      icon:"success",
      buttons:false,
      timer:3000
    })
    navigate('/Login')
    setLoading(false);
  })
} catch (error) {
  console.log(error);
}
}

const uploadData=async()=>{
 try {
   const salt=bcrypt.genSaltSync(10);
   let hash=bcrypt.hashSync(form.password,salt)
   await addDoc(usersRef,{
   name:form.name,
   password:hash,
   mobile:form.mobile
 })  
 } catch (error) {
  console.log(error);
 }
}

  return (
    <>
      {otpSent ? (
        <div className="flex w-full justify-center items-center md:min-h-fit mt-6">
          <div className="h-full md:w-1/5 w-9/12 border border-gray-500 rounded-lg pt-10 p-8">
            <h1 className="md:pb-16 pb-10 md:text-2xl text-xl text-center">
              OTP Authentication
            </h1>
            <div className=" flex flex-col h-24 items-center justify-center">
            <p>Enter OTP</p>
            <br />
            <input
              required
              className="text-center h-12 pl-2 text-xl font-bold md:w-1/2 w-3/5  bg-slate-900  outline-none  rounded"
              value={OTP}
              onChange={(e) => setOTP(e.target.value)}
            />
            </div>
            <div className="md:w-1/2 w-1/2  mx-auto mt-5 ">
              <button onClick={verifyOtp} className="rounded w-full my-2 text-xl h-11 bg-blue-950">
                {loading ? (
                  <span className="flex justify-center">
                    {" "}
                    <TailSpin height={25} color="white" />
                  </span>
                ) : (
                  "Confirm"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="SignUp">
          <h1 className="text-center text-2xl my-5 font-semibold">Sign Up</h1>
          <div className="h-30 md:flex md:justify-evenly md:w-2/3 flex flex-col items-center my-3">
            <div>
              <p>Name</p>
              <br />
              <input
                required
                className=" h-12 pl-2 text-xl font-bold  bg-slate-900 -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                type="text"
              />
            </div>
            <div>
              <p>Phone Number</p>
              <br />
              <input
                required
                className=" h-12 pl-2 text-xl font-bold  bg-slate-900 -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
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
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            <div className="md:w-96 w-60 mt-5 ">
              <button
                onClick={requestOtp}
                className="rounded w-full my-2 text-xl h-11 bg-blue-950"
              >
                {loading ? (
                  <span className="flex justify-center">
                    {" "}
                    <TailSpin height={25} color="white" />
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className="mt-3">
              <h4>
                Already have an Acoount ?{" "}
                <Link to={"/Login"}>
                  <span className=" text-blue-400 font-extrabold cursor-pointer">
                    {" "}
                    Login
                  </span>
                </Link>
              </h4>
            </div>
          </div>
          <div id="recaptcha-container"></div>
        </div>
      )}
    </>
  );
};

export default SignUp;
