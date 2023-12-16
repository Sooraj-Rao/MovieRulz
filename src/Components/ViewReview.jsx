import { doc, deleteDoc, getDocs } from "firebase/firestore";
import { db, reviewsRef } from "./Firebase/Firebase";
import { useEffect, useState } from "react";
import { failMessage } from "./Constants";
import AreYouSure from "./AreYouSure";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { DeleteSVG } from "./SVG/Svg";

const ViewReview = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [loader, setloader] = useState(false);
    const [AreYou, setAreYou] = useState({
        one: false,
        item: '',
        confirm: false
    });

    const handleDelete = async (item) => {
        try {
            setloader(true)
            await deleteDoc(doc(db, "reviews", item.id));
            failMessage(`Succesfully  Deleted Review of ${item.name}!`, 'success')
            setloader(false)
            setAreYou({ ...AreYou, item: '', confirm: false })
        } catch (error) {
            setloader(false)
            failMessage(`Failed to Delete Movie ${item.name}!`, 'default')
        }
    };


    async function getData() {
        try {
            setLoad(true);
            const _data = await getDocs(reviewsRef);
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
            failMessage('Failed to fetch Reviews!', 'info')
        }
    }
    useEffect(() => {
        !AreYou.confirm && getData()
        AreYou.confirm && handleDelete(AreYou.item)
    }, [AreYou.confirm])
    return (
        <>
            {
                AreYou.one && <AreYouSure AreYou={AreYou} setAreYou={setAreYou} />
            }
            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${AreYou.one ? ' blur-md  contrast-50' : 'blur-none'}`}>
                <h1 className=" text-center text-lg font-semibold py-4">Total Reviews - {data?.length}</h1>
                <table className="w-full text-sm text-left  text-gray-500 ">
                    {data && !load &&
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-5 py-3">
                                    Movie-ID
                                </th>
                                <th scope="col" className=" py-3">
                                    UserName
                                </th>
                                <th scope="col" className=" py-3 px-2">
                                    Review
                                </th>
                            </tr>
                        </thead>
                    }
                    {!load ?
                        data?.map((item, i) => {
                            return (
                                <tbody key={i} >
                                    <tr className="bg-white border-b  hover:bg-gray-200 cursor-default ">

                                        <td className=" p-4 font-semibold  w-[6rem]  text-gray-900 ">
                                            {item.movieid}
                                        </td>
                                        <td className="  sm:w-52 w-fit py-4 font-semibold text-gray-900 ">
                                            {item.name}
                                            <span className=" text-gray-600 text-xs pl-3">
                                                ({new Date(item.timestamp).toDateString()})
                                            </span>
                                        </td>
                                        <td className=" py-4 font-semibold  w-[2rem] text-gray-900 ">
                                            {(item.rating)} /5
                                        </td>
                                        <td className=" py-4 font-semibold  sm:max-w-[10rem] text-gray-900 ">
                                            {(item.thought)}
                                        </td>
                                        <td className=" py-4   ">
                                            {
                                                AreYou.confirm && AreYou.item.id == item.id ?
                                                <div className=" flex justify-center h-10 items-center w-full">
                                                <span className=" text-black pr-5 ">Deleting Review..</span>
                                                <span className=" h-6 w-6 border-2 border-black rounded-full border-t-transparent animate-spin"></span>
                                            </div>
                                                    :
                                                    <a className=" flex justify-center" data-tooltip-id="my-tooltip" data-tooltip-content="Delete">
                                                        <span onClick={() => setAreYou({ ...AreYou, one: true, item: item })}>
                                                        {DeleteSVG}
                                                        </span>
                                                    </a>
                                            }
                                        </td>
                                        <Tooltip id="my-tooltip" />
                                    </tr>
                                </tbody>

                            )
                        })
                        :
                        <div className=" flex justify-center h-60 items-center w-full">
                            <span className=" text-black pr-5 text-xl">Fetching Reviews..</span>
                            <span className=" h-10 w-10 border-2 border-black rounded-full border-t-transparent animate-spin"></span>
                        </div>
                    }
                </table>
            </div >
        </ >
    )
}

export default ViewReview