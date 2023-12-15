import React,{useState} from "react";
import { addDoc } from "firebase/firestore";
import { TailSpin  } from "react-loader-spinner";
import { moviesRef } from "./Firebase/Firebase";
import swal  from "sweetalert";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MovieContext } from "./Context/Context";

const AddMovie = () => {
  const context=useContext(MovieContext);
  const {login,userData}=context;
  const navigate=useNavigate();
    const [form, setForm] = useState({
        title:"",
        year:"",
        description:"",
        image:"",
        rated:0,
        rating:0
    })

    const [loading,setLoading]=useState(false);

    const addMovie=async()=>{
     if( !form.title || !form.year  || !form.image   || !form.description){
      swal({
        title:"Please fill all fields",
        icon:"info",
        buttons:false,
        timer:2000,
       
    }) 
  }else{
    try {
      if(login){
        setLoading(true)
         await addDoc(moviesRef,form); 
         swal({
             title:"Sucessfully Added",
             icon:"success",
             buttons:false,
             timer:2000
         })   
         setLoading(false)
         setForm({
          title:"",
          year:"",
          description:"",
          image:""
      })
    }else{
      navigate('/Login')
    }
     } catch (error) {
      swal({
        title:error,
        icon:"error",
        buttons:false,
        timer:2000
    })   
     }
    }
    }

  return (
    <div className="AddForm">
      <h1 className="text-center text-2xl mt-2">Add Movie</h1>
      <div className="h-30 md:flex md:justify-evenly md:w-2/3 flex flex-col items-center my-3">
        <div>
          <p className=" -mb-2">Title</p>
          <br />
          <input
          required
            className=" h-12 pl-2 text-xl  text-black -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
            value={form.title}
            onChange={(e)=>setForm({...form,title:e.target.value})} 
            type="text"
          />
        </div>
        <div>
          <p className=" -mb-3">Year</p>
          <br />
          <input
          required
            className="  h-12 pl-2 text-xl  text-black -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
            value={form.year}
            onChange={(e)=>setForm({...form,year:e.target.value})}
            type="text"
          />
        </div>
        <div>
          <p className=" -mb-3">Image URL</p>
          <br />
          <input
          required
            className="  h-12 pl-2 text-xl  text-black -mt-4 mb-2 md:w-96 w-70 outline-none  rounded"
            value={form.image}
            onChange={(e)=>setForm({...form,image:e.target.value})}
            type="text"
          />
        </div>
        <div className="textarea">
          <p>
            Description
            <br />
          </p>
          <textarea
            className=" outline-none rounded mt-1 w-full text-xl resize-none p-2 md:h-40 h-32 text-black text-start"
            value={form.description}
            onChange={(e)=>setForm({...form,description:e.target.value})}
            type="text"
          />
          <div className="flex justify-center my-3">
            <button onClick={addMovie} className=" w-40 my-2 text-xl h-11 bg-blue-950">
              {loading ? <span className="flex justify-center"> <TailSpin height={25}  color="white"/></span> : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovie;
