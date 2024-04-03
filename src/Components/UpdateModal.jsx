import { useEffect, useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from './Firebase/Firebase';
import { failMessage } from './Constants';

const UpdateModal = ({ showUpdate, setshowUpdate, getData }) => {
    const [Load, setLoad] = useState(false);
    const [Input, setInput] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
    })

    useEffect(() => {
        setInput({
            title: showUpdate?.title,
            year: showUpdate?.year,
            description: showUpdate?.description,
            image: showUpdate?.image,
        })
    }, [showUpdate])


    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInput({ ...Input, [name]: value })
    }

    const Update = async (e) => {
        e.preventDefault();
        if (Input.title == '' || Input.description == '' || Input.image == '' || Input.year == '') {
            return failMessage('Hmmm,Dont empty the fileds bro!', 'default')
        }
        if (Input.title == showUpdate?.title && Input.year == showUpdate?.year && Input.description == showUpdate?.description && Input.image == showUpdate?.image) {
            return failMessage('There are no changes made to Update !', 'default')
        }
        if (Input.year.length != 4) {
            return failMessage('Enter a valid Year !', 'default')
        }
        if (Input.description.length < 100) {
            return failMessage('Description is too short !', 'default')
        }
        try {
            setLoad(true);
            const DocRef = doc(db, "Movies", showUpdate?.id);
            await setDoc(DocRef, {
                title: Input.title,
                year: Input.year,
                image: Input.image,
                description: Input.description
            });
            setLoad(false)
            failMessage(`Succesfully Updated Movie ${Input.title} `, 'success')
            setshowUpdate('');
            getData();
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
                            <button onClick={() => setshowUpdate('')} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center  " data-modal-toggle="crud-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={Update} className="p-4 md:p-5">
                            <div className="grid gap-4 mb-4 grid-cols-2">
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Title</label>
                                    <input value={Input.title} name="title" onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Name of Movie" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Year</label>
                                    <input type='number' value={Input.year} name="year" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="Movie release year" required="" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Image Source</label>
                                    <input value={Input.image} name="image" onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900  text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  block w-full p-2.5 " placeholder="Image URL" required="" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                                    <textarea value={Input.description} name="description" onChange={handleChange} id="description" rows="4" className="block p-2.5 w-full resize-none text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Movie description "></textarea>
                                </div>
                            </div>
                            <button type="submit" className="text-white  items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
                                {Load ?
                                    <span className=' flex justify-center'>
                                        <h1 className=' h-5 w-5 border-[3px] rounded-full border-blue-200 border-t-transparent animate-spin '></h1>
                                    </span>
                                    :
                                    'Update  Movie'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateModal