import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, RouterProvider, Routes, useNavigate } from 'react-router-dom';
import LoginPerfil from './components/LoginPerfil';
import AdminComponent from './components/AdminComponent';
import GuardiaComponent from './components/GuardiaComponent';
import MenuAdmin from './components/MenuAdmin';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const onLogout=()=>{
    localStorage.removeItem('userInfo');
    // window.location.reload()
    setIsAuth(false); 
    navigate('/login');
  }
   
  return (
  <>
    <Navbar onLogout={onLogout} isAuth={isAuth}/>
    <div className='mainPage'>
    <Routes>
      
      <Route path='/' element = {<LoginPerfil setIsAuth= {setIsAuth}/>}/>
      <Route path='/login' element = {<LoginPerfil setIsAuth= {setIsAuth} onLogout={onLogout}/>}/>
      
      <Route path='/admin' element ={<GuardiaComponent isAuth={isAuth} setIsAuth={setIsAuth} Component={<AdminComponent/>}/>}/>
      <Route path='/personal' element={<MenuAdmin isAuth={isAuth} Component={<AdminComponent/>}/>}/>
      
    </Routes>
    </div>
    <Footer/>
    </>
    
  );


}

export default App
