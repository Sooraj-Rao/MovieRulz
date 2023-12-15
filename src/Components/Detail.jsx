import { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { db, reviewsRef } from "./Firebase/Firebase";
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import Review from "./Review";
import DatailAnim from "./Animate/DatailAnim";

import { failMessage } from "./Constants";


const Detail = () => {
  const [load, setLoad] = useState(false);
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
      failMessage('Unable to fetch movie details','info')
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
      failMessage('Unable to fetch movie Reviews!','info')
    }
  }
  useEffect(() => {
    getData();
  }, [id]);


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
                <span className=" font-semibold">{(data.rating / data.rated).toFixed()}/5
                  <span className=" font-normal pl-2">
                    Rating
                  </span>
                </span>
              </h1>
              <span className="md:text-l text-base text font w-full ">
                {data.description}
              </span>
              <hr className=" border border-slate-300" />
              <div className="flex gap-x-20 pt-5 ">
                <div className="">
                  <span>
                    Watch Trailer
                  </span>
                  <span className=" flex gap-5 items-center mt-5 bg-slate-300 p-2 rounded-md">
                    <span>
                      <svg height='1.5rem' viewBox="5.368 5.414 53.9 53.9" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#FFF" d="M41.272 31.81c-4.942-2.641-9.674-5.069-14.511-7.604v15.165c5.09-2.767 10.455-5.301 14.532-7.561h-.021z"></path><path fill="#E8E0E0" d="M41.272 31.81c-4.942-2.641-14.511-7.604-14.511-7.604l12.758 8.575c.001 0-2.324 1.289 1.753-.971z"></path><path fill="#CD201F" d="M27.691 51.242c-10.265-.189-13.771-.359-15.926-.803-1.458-.295-2.725-.95-3.654-1.9-.718-.719-1.289-1.816-1.732-3.338-.38-1.268-.528-2.323-.739-4.9-.323-5.816-.4-10.571 0-15.884.33-2.934.49-6.417 2.682-8.449 1.035-.951 2.239-1.563 3.591-1.816 2.112-.401 11.11-.718 20.425-.718 9.294 0 18.312.317 20.426.718 1.689.317 3.273 1.267 4.203 2.492 2 3.146 2.035 7.058 2.238 10.118.084 1.458.084 9.737 0 11.195-.316 4.836-.57 6.547-1.288 8.321-.444 1.12-.823 1.711-1.479 2.366a7.085 7.085 0 0 1-3.76 1.922c-8.883.668-16.426.813-24.987.676zM41.294 31.81c-4.942-2.641-9.674-5.09-14.511-7.625v15.166c5.09-2.767 10.456-5.302 14.532-7.562l-.021.021z"></path></g></svg>
                    </span>
                    <span> Youtube</span>
                  </span>
                </div>
                <div className=" ">
                  <span>Streming on</span>
                  <div className="bg-slate-300 flex items-center  gap-4 mt-5 p-2 rounded-md">
                    <span>
                      <img src="/netflix.png" alt="s" className=" h-8 w-8" />
                    </span>
                    <span>
                      <img src="/prime.png" alt="s" className=" h-10 w-10" />
                    </span>
                  </div>
                </div>
              </div>
              <br />
              <br />
              <Review getReview={getReview} id={id} Reviews={Reviews} prevRating={data.rating} userRated={data.rated} />
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Detail;
