import React from 'react'
import { animate } from '../Constants'

const DatailAnim = () => {
    return (
        <>
           <div className=" h-96 rounded flex  justify-center  ">
              <div className={`md:h-full h-[20rem]  rounded xl:w-[18rem]   md:w-[16rem] w-[60%]  ${animate}`} />
            </div>
            <div className="detail w-full h-full  md:px-4 p-2 -mt-3">
                <h1 className={`md:mt-2 mt-3   ${animate} h-10 mb-5 w-1/3  `}>
                </h1>
                <h1 className={` w-24 h-4 ${animate}`}></h1>
                {
                    Array(3).fill('').map((item, i) => {
                        return <h1 key={i} className={`my-3  w-full h-5 ${animate} `}> </h1>
                    })
                }
                <h1 className={` mt-10 h-6 w-40 ${animate}`}></h1>
                <h1 className={` mt-3 h-20 w-full ${animate}`}></h1>
                <div className=' flex justify-center'>
                <h1 className={` mt-2 h-10 w-1/2 ${animate}`}></h1>
                </div>
                <h1 className={` h-10 w-40 ${animate} my-5`}></h1>
                <div className={` h-40 w-full ${animate}`}></div>

            </div>

        </>
    )
}

export default DatailAnim


const ReviewAnim = () => {
    return (
        <div className=' flex justify-center'>
            <div className=' w-full'>
                <h1 className={` h-10 w-40 ${animate} my-5`}></h1>
                <div className={` h-40 w-full ${animate}`}></div>
            </div>
        </div>
    )
}

export { ReviewAnim }