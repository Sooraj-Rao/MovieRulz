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
      failMessage('Unable to fetch movie details')
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
      failMessage('Unable to fetch movie Reviews!')
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
              <br />
              <br />
              <Review id={id} Reviews={Reviews} prevRating={data.rating} userRated={data.rated} />
            </div>
          </>
        }
      </div>
    </>
  );
};

export default Detail;
