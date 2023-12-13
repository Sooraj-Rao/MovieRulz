import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { ThreeDots } from "react-loader-spinner";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./Firebase/Firebase";
import { Link } from "react-router-dom";
import { HomeCard } from "./Animate/HomeCard";

const Card = () => {
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function getData() {
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
    }
    getData();
  }, [])
  return (
    <div className=" flex h-screen text-center flex-wrap justify-center mt-4">
      {load ?
        <HomeCard />
        :
        data?.map((val, i) => {
          return (
            <Link key={i} to={`/Detail/${val.id}`}>
              <div className="bg-blue-100 group flex justify-center rounded-lg overflow-hidden cursor-pointer text-xl h-[23rem] w-64 m-4  " key={i}>
                <div className="text-lg font-sans ">
                  <div className=" flex justify-center h-3/4 w-[19rem] overflow-hidden " >
                    <img src={val.image} className="group-hover:scale-110  h-full w-full duration-300" />
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
            </Link>
          );
        })
      }
    </div>
  );
};

export default Card;
