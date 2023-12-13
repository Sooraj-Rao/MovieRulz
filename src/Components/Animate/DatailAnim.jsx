import React from 'react'

const DatailAnim = () => {
    return (
        <>
            <div className=" h-96 md:w-1/3 rounded w-full bg-slate-500 animate-pulse opacity-70 ">
            </div>
            <div className="detail w-full h-full  md:px-4 p-2 -mt-3 md:overflow-y-scroll">
                <h1 className="md:mt-2 mt-3   bg-slate-500 animate-pulse opacity-70 h-10 mb-5 w-1/3 rounded-md  ">
                </h1>
                <h1 className=' w-24 rounded-md h-4 bg-slate-500 animate-pulse opacity-70'></h1>
                {
                    Array(3).fill('').map((item, i) => {
                        return <h1 key={i} className="my-3  w-full bg-slate-500 h-5 animate-pulse opacity-70 rounded-md "> </h1>
                    })
                }
                <h1 className=' mt-10 rounded-md h-6 w-40 bg-slate-500 animate-pulse opacity-70'></h1>
                <h1 className=' mt-3 rounded-md h-10 w-full bg-slate-500 animate-pulse opacity-70'></h1>
                <h1 className=' mt-2 rounded-md h-10 w-full bg-slate-500 animate-pulse opacity-70'></h1>
                <h1 className=' h-10 w-40 rounded-md bg-slate-700 animate-pulse opacity-70 my-5'></h1>
            <div className=' h-40 rounded-md w-full bg-gray-700 animate-pulse opacity-70'></div>
     
            </div>
     
        </>
    )
}

export default DatailAnim


const ReviewAnim = () => {
    return (
        <div className=' flex justify-center'>
        <div className=' w-1/2'>
            <h1 className=' h-10 w-40 rounded-md bg-slate-700 animate-pulse opacity-70 my-5'></h1>
            <div className=' h-40 rounded-md w-full bg-gray-700 animate-pulse opacity-70'></div>
        </div>
        </div>
    )
}

export { ReviewAnim }