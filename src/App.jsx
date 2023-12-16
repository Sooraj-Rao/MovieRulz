import Header from './Components/Header';
import { Card } from './Components/Card';
import { Routes, Route } from 'react-router-dom';
import AddMovie from './Components/AddMovie';
import Detail from './Components/Detail';
import { useContext } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { MovieContext } from './Components/Context/Context';
import ViewAll from './Components/ViewAll';
import Users from './Components/Users';
import ViewReview from './Components/ViewReview';


function App() {
  const context = useContext(MovieContext);

  const { login, isAdmin,userData } = context;

  return (
    <div>
      <ReactNotifications />
      <Header isAdmin={isAdmin} />
      <Routes>
        <Route path='/' element={<Card />}></Route>
        {
          login &&
          <>
            <Route path='/addMovie' element={<AddMovie />}></Route>
            <Route path='/viewAll' element={<ViewAll />}></Route>
            {
              isAdmin &&
              <>
                <Route path='/users' element={<Users />}></Route>
                <Route path='/reviews' element={<ViewReview />}></Route>
              </>
            }
          </>
        }
        <Route path='/movie/:id' element={<Detail userData={userData} />}></Route>
        {
          !login &&
          <>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signUp' element={<Signup />}></Route>
          </>
        }
        <Route path='/*' element={<Card />}></Route>
      </Routes>
    </div>
  );
}

export default App;