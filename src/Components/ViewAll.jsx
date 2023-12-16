import { doc, deleteDoc, getDocs } from "firebase/firestore";
import { db, moviesRef } from "./Firebase/Firebase";
import { useEffect, useState } from "react";
import ViewallAnim from "./Animate/ViewallAnim";
import { failMessage } from "./Constants";
import UpdateModal from "./UpdateModal";
import AreYouSure from "./AreYouSure";
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'
import { DeleteSVG, UpdateSVG } from "./SVG/Svg";

const ViewAll = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
    const [loader, setloader] = useState(false);
    const [showUpdateModal, setshowUpdateModal] = useState({
        one: false,
        two: ''
    })
    const [AreYou, setAreYou] = useState({
        one: false,
        item: '',
        confirm: false
    });

    const handleDelete = async (item) => {
        try {
            setloader(true)
            await deleteDoc(doc(db, "Movies", item.id));
            failMessage(`Succesfully  Deleted Movie ${item.title}!`, 'success')
            setloader(false)
            setAreYou({ ...AreYou, item: '', confirm: false })
        } catch (error) {
            setloader(false)
            failMessage(`Failed to Delete Movie ${item.title}!`, 'default')
        }
    };


    async function getData() {
        try {
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
        } catch (error) {
            setLoad(false)
            failMessage('Failed to fetch Movies!', 'info')
        }
    }
    useEffect(() => {
        !AreYou.confirm && getData();
        AreYou.confirm && handleDelete(AreYou.item)
    }, [showUpdateModal, AreYou.confirm])
    return (
        <>

            {
                showUpdateModal.one &&
                <UpdateModal showUpdateModal={showUpdateModal} setshowUpdateModal={setshowUpdateModal} />
            }
            {
                AreYou.one && <AreYouSure AreYou={AreYou} setAreYou={setAreYou} />
            }
            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${showUpdateModal.one || AreYou.one ? ' blur-md  contrast-50' : 'blur-none'}`}>
                <table className="w-full text-sm text-left  text-gray-500 ">
                    {data && !load &&
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                            <tr>
                                <th scope="col" className="px-5 py-3">
                                    Image
                                </th>
                                <th scope="col" className=" py-3">
                                    Title
                                </th>
                                <th scope="col" className=" py-3">
                                    Description
                                </th>
                                <th scope="col" className=" py-3">
                                    Edit
                                </th>
                                <th scope="col" className=" py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                    }
                    {!load ?
                        data?.map((item, i) => {
                            return (
                                <tbody key={i} >
                                    <tr className="bg-white border-b  hover:bg-gray-200 cursor-default ">
                                        <td className="p-4 sm:w-52 w-fit">
                                            <img src={item.image} className="w-16 md:w-32 max-w-full max-h-full" alt="s" />
                                        </td>
                                        <td className="  sm:w-52 w-fit py-4 font-semibold text-gray-900 ">
                                            {item.title} ({item.year})
                                        </td>
                                        <td className=" py-4 font-semibold  sm:max-w-[10rem] text-gray-900 ">
                                            {(item.description)}
                                        </td>
                                        <td className=" py-4  flex justify-center items-center h-64  ">
                                            <a data-tooltip-id="my-tooltip" data-tooltip-content="Update">
                                                <span  onClick={() => setshowUpdateModal({ one: true, two: item })} >
                                                    {UpdateSVG}
                                                </span>
                                            </a>
                                        </td>
                                        <td className=" py-4   ">
                                            {
                                                AreYou.confirm && AreYou.item.id == item.id ?
                                                    <div className=" flex justify-center h-10 items-center w-full">
                                                        <span className=" text-black pr-5 ">Deleting Movie..</span>
                                                        <span className=" h-6 w-6 border-2 border-black rounded-full border-t-transparent animate-spin"></span>
                                                    </div>
                                                    :
                                                    <a className=" flex justify-center " data-tooltip-id="my-tooltip" data-tooltip-content="Delete">
                                                        <span  onClick={() => setAreYou({ ...AreYou, one: true, item: item })}>
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
                        <ViewallAnim />
                    }
                </table>
            </div >
        </ >
    )
}

export default ViewAll