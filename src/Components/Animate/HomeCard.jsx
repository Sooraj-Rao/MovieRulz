export const HomeCard = () => {
    return (
        <>
            {
                Array(10).fill('').map((item, i) => {
                    return (
                        <div key={i} >
                            <div className="  group flex justify-center rounded-lg bg-gray-200 overflow-hidden cursor-pointer text-xl h-[23rem] w-64 m-4  " key={i}>
                                <div className="text-lg  ">
                                    <div className=" flex bg-gray-500 animate-pulse opacity-75  justify-center h-3/4 w-[19rem] overflow-hidden " >
                                        <div className="group-hover:scale-110  h-full w-full duration-300" alt="/public/play.png" />
                                    </div>
                                    <div className=" w-full flex flex-col ml-10 ">
                                        <h1 className="  h-5 rounded-md mt-2 mb-1 w-2/3 bg-gray-500 animate-pulse opacity-75 "></h1>
                                        <span className="  h-5 rounded-md my-1 w-1/2 bg-gray-500 animate-pulse opacity-75 "></span>
                                        <span className="  h-5 rounded-md my-1 w-1/3 bg-gray-500 animate-pulse opacity-75 "></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}