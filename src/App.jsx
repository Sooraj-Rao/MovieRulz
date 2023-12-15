import Header from './Components/Header';
import Card from './Components/Card';
import { Routes, Route } from 'react-router-dom';
import AddMovie from './Components/AddMovie';
import Detail from './Components/Detail';
import { useContext } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { MovieContext } from './Components/Context/Context';



function App() {
  const context = useContext(MovieContext);
  const { login, userData } = context;
  return (
    <div>
      <ReactNotifications />
      <Header />
      <Routes>
        <Route path='/' element={<Card />}></Route>
        {
          login &&
          <Route path='/addMovie' element={<AddMovie />}></Route>
        }
        <Route path='/detail/:id' element={<Detail />}></Route>
        {
          !login &&
          <>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signUp' element={<Signup />}></Route>
          </>
        }
      </Routes>
    </div>
  );
}

export default App;