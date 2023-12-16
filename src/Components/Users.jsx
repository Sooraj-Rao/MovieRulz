import React, { useEffect, useState } from 'react'
import { usersRef } from './Firebase/Firebase.jsx'
import { getDocs } from 'firebase/firestore';
import { failMessage } from './Constants.jsx';

const Users = () => {
    const [data, setData] = useState([])
    const [load, setLoad] = useState(true);


    async function getData() {
        try {
            const _data = await getDocs(usersRef);
            const result = [];
            _data.forEach((doc) => {
                let res = doc.data();
                result.push(res)
            })
            setData(result)
            setLoad(false)
        } catch (error) {
            setLoad(false)
            failMessage('Unable to fetch Users!', 'info')
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <div>
            <div className="relative overflow-x-auto ">
                <h1 className=' py-5 font-semibold text-lg text-center'>Total Users -{data ? data.length : 'loading...'}</h1>
                <table className="w-full text-sm flex flex-col items-center   text-left rtl:text-right text-gray-500 ">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                S.No
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone Number
                            </th>
                        </tr>
                    </thead>
                    {!load ?
                        data?.map((item, i) => {
                            return (
                                <tbody key={i}>
                                    <tr className="bg-white  text-gray-900">
                                        <th scope="row" className="px-6 py-4  font-medium  whitespace-nowrap ">
                                            {i + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium  whitespace-nowrap ">
                                            {item.name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.mobile}
                                        </td>
                                    </tr>
                                </tbody>
                            )
                        })
                        :
                        <tbody className=' flex justify-center items-center h-60 '>
                            <span className=' pr-5 text-xl'>Fetching Users..</span>
                            <tr className='h-10 w-10 rounded-full border-4 border-black  border-t-transparent animate-spin'></tr>
                        </tbody>
                    }
                </table>
            </div>

        </div>
    )
}

export default Users