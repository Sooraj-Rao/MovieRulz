import Header from './Components/Header';
import Card from './Components/Card';
import { Routes, Route } from 'react-router-dom';
import AddMovie from './Components/AddMovie';
import Detail from './Components/Detail';
import { createContext, useContext, useEffect, useState } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

const Appstate = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUserName] = useState("");

  return (
    <div>
      <ReactNotifications />
      <Appstate.Provider value={{ login, username, setLogin, setUserName }}>
        <Header />
        <Routes>
          <Route path='/' element={<Card />}></Route>
          <Route path='/addMovie' element={<AddMovie />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signUp' element={<Signup />}></Route>
        </Routes>
      </Appstate.Provider>
    </div>
  );
}

export default App;
export { Appstate }