import { animate } from "../Constants"

const ViewallAnim = () => {
    return (
        <div className=" m-2">
            <div className={`${animate} w-full h-12 mb-5`}>
            </div>
            {Array(10).fill('').map((item, i) => {
                return (
                    <div key={i} >
                        <div className=" flex my-5">
                            <div className={`w-16 md:w-32 h-48  ${animate}`} alt="image" />
                            <div className={` w-32 h-8 m-20 py-4 ${animate} `}>
                            </div>
                            <div className={`py-4 w-1/2  h-32 my-4 `}>
                                <div className={`py-4  w-full ${animate} h-6 my-4 `}>  </div>
                                <div className={`py-4  w-full ${animate} h-6 my-4 `}>  </div>
                                <div className={`py-4  w-2/3 ${animate} h-6 my-4 `}>  </div>
                            </div>

                            <div className=" flex justify-between items-center w-40 ml-20">
                                <div className={` py-4 px-2 h-10 w-12 ${animate}`}>
                                </div>
                                <div className={` py-4 px-2 h-10 w-12 ${animate}`}>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ViewallAnim