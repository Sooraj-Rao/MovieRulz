import Header from './Components/Header';
import Card from './Components/Card';
import { Routes,Route } from 'react-router-dom';
import AddMovie from './Components/AddMovie';
import Detail from './Components/Detail';
import { createContext, useContext, useState } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';


const Appstate=createContext();
function App() {

  const[login,setLogin]=useState(false);
  const[username,setUserName]=useState("");

  return (
    <Appstate.Provider value={{login,username,setLogin,setUserName}}>
    <Header/>
    <Routes>
      <Route path='/' element={<Card/>}></Route>
      <Route path='/AddMovie' element={<AddMovie/>}></Route>
      <Route path='/Detail/:id' element={<Detail/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/SignUp' element={<Signup/>}></Route>
    </Routes>
    </Appstate.Provider>
  );
}

export default App;
export {Appstate}