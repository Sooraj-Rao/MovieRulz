import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db, reviewsRef } from "./Firebase/Firebase";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Review from "./Review";
import DatailAnim from "./Animate/DatailAnim";

import { failMessage } from "./Constants";
import { YTSVG } from "./SVG/Svg";


const Detail = ({ userData }) => {
  const [load, setLoad] = useState(false);
  const [LimitReached, setLimitReached] = useState(false);
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    rating: 0,
    description: "",
    rated: 0
  });
  const [Reviews, setReviews] = useState([]);

  const { id } = useParams();


  async function getData() {
    try {
      setLoad(true);
      const _doc = doc(db, "Movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      getReview();
    } catch (error) {
      failMessage('Unable to fetch movie details', 'info')
    }
  }

  async function getReview() {
    try {
      let quer = query(reviewsRef, where('movieid', '==', id));
      const querySnapshot = await getDocs(quer);
      const newData = [];
      querySnapshot.forEach((doc) => {
        newData.push(doc.data());
      });
      setReviews(newData);
      setLoad(false)
    } catch (error) {
      setLoad(false)
      failMessage('Unable to fetch movie Reviews!', 'info')
    }
  }
  useEffect(() => {
    data.title == '' && getData();
    setLimitReached(Reviews.find((e) => e.name == userData.name))
  }, [id,Reviews]);
  

  let Rating = ((data.rated != 0 ? (data?.rating / data?.rated).toFixed(1) : 'No reviews'))
  Rating = (Rating.includes('.0')) ? Rating.split('.')[0] : Rating;
  
  return (
    <>
      <div className={` mx-auto md:mt-10 mt-4 md:w-5/6 w-11/12   h-screen  flex md:flex-row flex-col  md:p-0
      ${load ? 'md:h-screen' : 'md:h-96'}
      `}>
        {load ?
          <DatailAnim />
          :
          <>
            <div className=" h-96 rounded flex  justify-center  ">
              <img className="md:h-full h-full  rounded    md:w-[25rem] w-[60%] " src={data.image} alt="" />
            </div>
            <div className="h-[37.5rem] detail w-full   md:px-4 p-2 -mt-3 md:overflow-y-scroll">
              <h1 className="text-4xl font-bold md:mt-0 mt-3 title">
                {data.title} <span className=" text-base ">({data.year})</span>
              </h1>
              <h1 className=" flex gap-4 items-center">
                <ReactStars className="mt-2 mb-2" size={20} value={data.rating / data.rated} color2="black" color1="gray" edit={false} />
                <span className=" font-semibold">
                  <span className=" font-normal pl-2">
                    <span className=" font-semibold text-xl">
                      {Rating}
                    </span>
                    /5
                    Rating
                  </span>
                </span>
              </h1>
              <span className="md:text-l text-base text font w-full ">
                {data.description}
              </span>
              <hr className=" border border-slate-200 my-2" />
              <div className="flex gap-x-20 pt-5 ">
                <div className="">
                  <span>
                    Watch Trailer
                  </span>
                  <span onClick={() => window.open(import.meta.env.VITE_YTURL + data.title + ' trailer')} className=" cursor-pointer flex gap-5 items-center mt-5 bg-slate-300 hover:bg-slate-200 p-2 rounded-md">
                    <span>
                      {YTSVG}
                    </span>
                    <span> Youtube</span>
                  </span>
                </div>
                <div className=" ">
                  <span>Streming on</span>
                  <div className="bg-slate-300 flex items-center  gap-4 mt-5 p-2 rounded-md">
                    <span>
                      <img onClick={() => window.open('https://www.netflix.com/in/')} src="/netflix.png" alt="s" className=" h-8 w-8" />
                    </span>
                    <span>
                      <img onClick={() => window.open('https://www.primevideo.com/')} src="/prime.png" alt="s" className=" h-10 w-10" />
                    </span>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <Review LimitReached={LimitReached} getReview={getReview} id={id} Reviews={Reviews} prevRating={data.rating} userRated={data.rated} />
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Detail;
