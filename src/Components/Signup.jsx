import { useState } from "react";
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
import { addDoc } from "firebase/firestore";
import { PasswordSVG, PhoneSVG, UserSVG } from "./SVG/Svg";
import { failMessage } from './Constants.jsx';

const auth = getAuth(app);

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [Input, setInput] = useState({
    name: "",
    mobile: "",
    password: "",
    confirmPass: ''
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
    signInWithPhoneNumber(auth, `+91${Input.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        failMessage(`Sent OTP to ${Input.mobile} !`, 'success')
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        failMessage('Failed to Send OTP!', 'info')
      });
  };

  const verifyOtp = () => {
    setLoading(true);
    window.confirmationResult.confirm(OTP)
      .then((result) => {
        uploadData();
        failMessage('Succesfully Registerd!', 'success')
        navigate('/Login')
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        failMessage('Invalid OTP!', 'info')
      })

  }

  const uploadData = async () => {
    try {
      const salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(Input.password, salt)
      await addDoc(usersRef, {
        name: Input.name,
        password: hash,
        mobile: Input.mobile
      })
    } catch (error) {
      failMessage('Registration failed!', 'info')
    }
  }


  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setInput({ ...Input, [name]: value })
  }

  return (
    <>

      {otpSent ? (
        <div className=" h-[calc(100vh-5rem)] bg-slate-300">
          <div className="flex w-full justify-center items-center md:min-h-fit pt-10  ">
            <div className="h-full md:w-2/6 w-9/12 border border-gray-500  rounded-lg pt-10 p-8 shadow-[0px_0px_10px_1px] shadow-slate-400 ">
              <h1 className="md:pb-16 pb-10 md:text-2xl text-xl text-center">
                OTP Authentication
              </h1>
              <div className=" flex flex-col h-24 text-lg items-center justify-center">
                <p>Enter 6 Digit  OTP sent to {Input.mobile}</p>
                <br />
                <input
                  required
                  autoFocus
                  placeholder="6 digit OTP"
                  type="number"
                  className="text-center h-12 pl-2 text-xl font-bold md:w-2/3 w-3/5  bg-slate-200  outline-none  rounded"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              <div className="md:w-1/2 w-1/2  mx-auto mt-5 ">
                <button disabled={OTP.length != 6} onClick={verifyOtp} className="rounded disabled:cursor-not-allowed disabled:bg-gray-500 w-full my-2 text-xl h-11 text-white bg-blue-600">
                  {loading ? (
                    <span className=' flex justify-center'>
                      <h1 className=' h-5 w-5 border-[3px] rounded-full border-blue-200 border-t-transparent animate-spin '></h1>
                    </span>
                  ) : (
                    "Confirm"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <section className="bg-slate-300">
          <div className=" container flex items-center justify-center  h-[calc(100vh-5rem)] px-6 mx-auto">
            <div className="w-full max-w-md shadow-[0px_0px_10px_1px] shadow-slate-400  rounded-md p-4">
              <h1 className=" text-center text-2xl">New here ? Signin Now </h1>
              <div className="relative flex items-center mt-8">
                <span className="absolute">
                  {UserSVG}
                </span>
                <input name="name" value={Input.name} onChange={handleChange} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Username" />
              </div>

              <div className="relative flex items-center mt-6">
                <span className="absolute">
                  {PhoneSVG}
                </span>
                <input value={Input.mobile} name="mobile" onChange={handleChange} type="number" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Phone number" />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  {PasswordSVG}
                </span>

                <input value={Input.password} onChange={handleChange} name="password" type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Password" />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  {PasswordSVG}
                </span>

                <input value={Input.confirmPass} onChange={handleChange} name="confirmPass" type="password" className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Confirm Password" />
              </div>

              <div className="mt-6">
                <button onClick={requestOtp} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 trans Input bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  {
                    loading ?

                      <span className=' flex justify-center'>
                        <h1 className=' h-5 w-5 border-[3px] rounded-full border-blue-200 border-t-transparent animate-spin '></h1>
                      </span>
                      :
                      'Signup'
                  }
                </button>

                <div className="mt-6 text-center ">
                  <Link to={'/login'} className=" font-semibold text-sm text-blue-500 hover:underline ">
                    Already have an account?
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <div id="recaptcha-container"></div>
    </>
  );
};

export default SignUp;
