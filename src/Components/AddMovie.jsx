import React, { useState } from "react";
import { addDoc } from "firebase/firestore";
import { TailSpin } from "react-loader-spinner";
import { moviesRef } from "./Firebase/Firebase";
import swal from "sweetalert";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MovieContext } from "./Context/Context";
import { failMessage } from "./Constants";

const AddMovie = () => {
  const context = useContext(MovieContext);
  const { login, userData } = context;
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    title: "",
    year: "",
    description: "",
    image: "",
    rated: 0,
    rating: 0
  })

  const [loading, setLoading] = useState(false);

  const addMovie = async () => {
    if (!Input.title || !Input.year || !Input.image || !Input.description) {
      failMessage('All fields mandatory!', 'info')
    } else {
      try {
        if (login) {
          setLoading(true)
          await addDoc(moviesRef, Input);
          failMessage(`Succesfully added Movie "${Input.title}"!`, 'success')
          setLoading(false)
          setInput({
            title: "",
            year: "",
            description: "",
            image: ""
          })
        } else {
          navigate('/Login')
        }
      } catch (error) {
        setLoading(false)
        failMessage('Unable to add Movie', 'info')
      }
    }
  }

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInput({ ...Input, [name]: value })
  }

  return (
    <section className="bg-slate-300">
      <div className=" container flex items-center justify-center  h-[calc(100vh-5rem)] px-6 mx-auto">
        <div className="w-full max-w-md shadow-[0px_0px_10px_1px] shadow-slate-400  rounded-md p-4">
          <h1 className=" text-center text-2xl">Add Movie</h1>
          <div className="relative flex items-center mt-8">
            <span className="absolute">
            </span>
            <input name="title" value={Input.title} onChange={handleChange} type="text" className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Movie Name" />
          </div>

          <div className="relative flex items-center mt-6">
            <span className="absolute">
            </span>
            <input value={Input.year} name="year" onChange={handleChange} type="number" className=" block w-full py-3 text-gray-700 bg-white border rounded-lg px-3 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Release year" />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
            </span>

            <textarea value={Input.description} onChange={handleChange} name="description" type="text" className="resize-none  block w-full px-3 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Description" />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
            </span>

            <input value={Input.image} onChange={handleChange} name="image" type="text" className="block w-full px-3 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" placeholder="Image Link" />
          </div>

          <div className="mt-6">
            <button onClick={addMovie} className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 trans Input bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              {
                loading ?

                  <span className=' flex justify-center'>
                    <h1 className=' h-5 w-5 border-[3px] rounded-full border-blue-200 border-t-transparent animate-spin '></h1>
                  </span>
                  :
                  'Add'
              }
            </button>


          </div>
        </div>
      </div>
    </section>
  );
};

export default AddMovie;
