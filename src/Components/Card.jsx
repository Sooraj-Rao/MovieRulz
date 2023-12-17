import  { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./Firebase/Firebase";
import {  useNavigate } from "react-router-dom";
import { HomeCard } from "./Animate/HomeCard";
import { failMessage } from "./Constants";


export const Card = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([])
  const [load, setLoad] = useState(false);


  async function getData() {
   try {
     setLoad(true);
     const _data = await getDocs(moviesRef);
     const result = [];
     _data.forEach((doc) => {
       let res = doc.data();
       res.id = doc.id;
       result.push(res)
     })
     setData(result)
     setLoad(false)
    } catch (error) {
     setLoad(false)
     failMessage('Unable to fetch Movies','info')
   }
  }
  useEffect(() => {
    getData();
  }, [])


  return (
    <div className=" flex h-screen text-center flex-wrap   justify-center mt-4">
      {load ?
        <HomeCard />
        :
        data?.map((val, i) => {
          return (
            <div key={i} onClick={() => navigate(`/movie/${val.id}`)}>
              <div className="bg-blue-100 group flex justify-center rounded-lg overflow-hidden cursor-pointer text-xl sm:h-[23rem] w-64 m-4  " key={i}>
                <div className="text-lg font-sans ">
                  <div className=" flex justify-center h-3/4 w-[19rem] overflow-hidden " >
                    <img src={val.image ? val.image : '/play.png'} className="group-hover:scale-110  h-full w-full duration-300" />
                  </div>
                  <h1 className=" font-semibold  text-xl mt-2">{val.title}</h1>
                  <span className=" flex justify-center h-6"><ReactStars
                    size={20}
                    value={val.rating / val.rated}
                    edit={false}
                    color1="rgb(162, 155, 155)"
                    color2="black"
                  /></span>
                  <span>{val.year}</span>
                </div>
              </div>
            </div>
          );
        })
      }

    </div>
  );
};

