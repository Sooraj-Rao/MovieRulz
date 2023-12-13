import React, { useContext, useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { reviewsRef, db } from './Firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { ThreeDots, TailSpin } from 'react-loader-spinner';
import swal from 'sweetalert';
import { Appstate } from '../App';
import { useNavigate } from 'react-router-dom';
import { ReviewAnim } from './Animate/DatailAnim';

const Review = ({ id, Reviews, prevRating, userRated, load }) => {
  const useAppState = useContext(Appstate);
  const navigate = useNavigate();

  const [rating, setRating] = useState(0);
  const [loader, setLoader] = useState(false);
  const [input, setinput] = useState('');


  const sendReview = async () => {
    if (rating == 0) {
      return
    }
    try {
      if (useAppState.login) {
        setLoader(true)
        await addDoc(reviewsRef, {
          movieid: id,
          name: useAppState.username,
          rating: rating,
          thought: input,
          timestamp: new Date().getTime()
        })

        const ref = doc(db, "Movies", id);
        await updateDoc(ref, {
          rating: prevRating + rating,
          rated: userRated + 1
        })

        setLoader(false)
        setinput('');
      } else {
        navigate('/Login')
      }
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000
      })
    }
  }


  console.log(load);
  return (
    <div className='flex flex-col border-t'>
      <span className=' flex items-center gap-4'>
      <ReactStars
        size={30}
        half={true}
        value={rating}
        edit={true}
        onChange={(e) => setRating(e)}
      />
      <span className=' pt-1'>{rating}/5</span>
      </span>
      <input type="text" placeholder='Share your thoughts..' className='rounded outline-none  focus:border-blue-400 focus:border-2 border-2 pl-2 h-10 my-2 text-black'
        value={input}
        onChange={(e) => setinput(e.target.value)}
      />
      <button onClick={sendReview} className=' h-10 bg-blue-700 text-white Poppins  rounded'> Post Review
      </button>
      {
        loader ? <ReviewAnim /> :
          <div>
            <h1 className='text-2xl my-2'>User Reviews</h1>
            {
              Reviews?.length > 0 ?
                Reviews?.map((e, i) => {
                  return (
                    <div key={i} className=' w-full min-h-fit my-3 bg-gray-200 rounded-md px-4 py-3 '>
                      <div className=''>
                        <h3 className='text-xl text-blue-400'>{e.name} <span className=' text-sm  text-gray-700 pl-4 '> Posted on - {new Date(e.timestamp).toLocaleString().split(',')[0]}</span> </h3>
                      </div>
                      <div>
                        <span className=' flex items-center gap-4'>
                        <ReactStars
                          size={16}
                          half={true}
                          value={e.rating}
                          edit={false}
                          />
                        <span className=' font-semibold text-blue-800'>{e.rating}/5 </span>
                          </span>
                        <h3>{e.thought}</h3>
                      </div>
                    </div>
                  )
                })
                :
                <span className=' font-light text-blue-300'>Be the first to add review</span>
            }
          </div>
      }
    </div>
  )
}

export default Review