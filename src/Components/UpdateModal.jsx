import React, { useEffect, useState } from 'react';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './Firebase/Firebase';
import { failMessage } from './Constants';

const UpdateModal = ({ showUpdateModal, setshowUpdateModal }) => {
    const [Load, setLoad] = useState(false);
    const [Input, setInput] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
    })
    useEffect(() => {
        setInput({
            title: showUpdateModal.two.title,
            year: showUpdateModal.two.year,
            description: showUpdateModal.two.description,
            image: showUpdateModal.two.image,
        })
    }, [])


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput({ ...Input, [name]: value })
    }

    const Update = async () => {
        try {
            setLoad(true);
            const DocRef = doc(db, "Movies", showUpdateModal.two.id);
            await setDoc(DocRef, {
                title: Input.title,
                year: Input.year,
                image: Input.image,
                description: Input.description
            });
            setLoad(false)
            failMessage(`Succesfully Updated Movie ${Input.title} `, 'success')
            setshowUpdateModal({ one: false, two: '' })
        } catch (error) {
            setLoad(false)
            failMessage(`Failed to Update Movie ${Input.title} `, 'info')
        }
    }

    return (
        <div>
            <div id="crud-modal" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0  z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative p-4 w-full max-w-md max-h-full mt-10 ">
                    <div className="relative bg-white rounded-lg shadow ">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                            <h3 className="text-lg font-semibold text-gray-900 ">
                                Update Movie
                            </h3>
                            <button onClick={() => setshowUpdateModal({ ...showUpdateModal, one: false })} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                    <input value={Input.title} name="title" onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Year</label>
                                    <input value={Input.year} name="year" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Type product name" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Image Source</label>
                                    <input value={Input.image} name="image" onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  block w-full p-2.5 " placeholder="Type product name" required="" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                    <textarea value={Input.description} name="description" onChange={handleChange} id="description" rows="4" className="block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write product description here"></textarea>
                                </div>
                            </div>
                            <button onClick={Update} type="submit" className="text-white  items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
                                {Load ?
                                    <span className=' flex justify-center'>
                                        <h1 className=' h-5 w-5 border-[3px] rounded-full border-blue-200 border-t-transparent animate-spin '></h1>
                                    </span>
                                    :
                                    'Update  Movie'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateModal