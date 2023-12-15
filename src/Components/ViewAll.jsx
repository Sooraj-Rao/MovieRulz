import { doc, deleteDoc, getDocs } from "firebase/firestore";
import { db, moviesRef } from "./Firebase/Firebase";
import { useEffect, useState } from "react";
import ViewallAnim from "./Animate/ViewallAnim";
import { failMessage } from "./Constants";
import UpdateModal from "./UpdateModal";
import AreYouSure from "./AreYouSure";

const ViewAll = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(false)
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
            await deleteDoc(doc(db, "Movies", item.id));
            getData();
            setAreYou({ ...AreYou, item: '', confirm: false })
            failMessage(`Succesfully  Deleted Movie ${item.title}!`, 'success')
        } catch (error) {
            failMessage(`Failed to Delete Movie ${item.title}!`, 'info')
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
            failMessage('Failed to fetch Movies!', 'info')
        }
    }
    useEffect(() => {
        showUpdateModal.two == '' && getData();
        AreYou.confirm && handleDelete(AreYou.item)
    }, [showUpdateModal, AreYou.confirm])
    console.log(AreYou);
    return (
        <>
            {
                showUpdateModal.one &&
                <UpdateModal showUpdateModal={showUpdateModal} setshowUpdateModal={setshowUpdateModal} />
            }
            {
                AreYou.one && <AreYouSure AreYou={AreYou} setAreYou={setAreYou} />
            }
            <div className={`relative overflow-x-auto shadow-md sm:rounded-lg ${showUpdateModal.one && ' blur-lg brightness-75'}`}>
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
                                    <tr className="bg-white border-b  hover:bg-gray-50 ">
                                        <td className="p-4 sm:w-52 w-fit">
                                            <img src={item.image} className="w-16 md:w-32 max-w-full max-h-full" alt="s" />
                                        </td>
                                        <td className="  sm:w-52 w-fit py-4 font-semibold text-gray-900 ">
                                            {item.title} ({item.year})
                                        </td>
                                        <td className=" py-4 font-semibold  sm:max-w-[10rem] text-gray-900 ">
                                            {(item.description)}
                                        </td>
                                        <td className=" py-4 pl-7 ">
                                            <span onClick={() => setshowUpdateModal({ one: true, two: item })} >
                                                <svg height="1.3rem" className=' cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                            </span>
                                        </td>
                                        <td className=" py-4 px-2">
                                            <span onClick={() => setAreYou({ ...AreYou, one: true, item: item })}>
                                                <svg height="1.3rem" className=' cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M14 11V17" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M4 7H20" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M6 7H12H18V18C18 19.6569 16.6569 21 15 21H9C7.34315 21 6 19.6569 6 18V7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                            </span>
                                        </td>
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