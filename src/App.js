import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './compoents/Navbar';
import Explore from './pages/Explore';
import WorkoutContextProvider from './context/WorkoutContext';


function App() {
  const {user} = useAuthContext();
  return (
    <div className="App">
     <WorkoutContextProvider>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path='/' element={user ? <Home /> : <Navigate to="/login" />}></Route>
            <Route path='/explore' element={user ? <Explore /> : <Navigate to="/login" />}></Route>
            <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />}></Route>
            <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/" />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </WorkoutContextProvider> 
      
    </div>
  );
}

export default App;
