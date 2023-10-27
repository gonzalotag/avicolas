import { useEffect, useState } from 'react'
import './App.css'
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import { Route, RouterProvider, Routes, useNavigate } from 'react-router-dom';
import LoginPerfil from './components/LoginPerfil';
import AdminComponent from './components/AdminComponent';
import GuardiaComponent from './components/GuardiaComponent';
import MenuAdmin from './components/MenuAdmin';
import RegistroPersonal from './components/RegistroPersonal';
import TablaPersonal from './components/TablaPersonal';
import Almacen from './components/Almacen';
import ContenidoAdmin from './components/ContenidoAdmin';


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
    <NavBar onLogout={onLogout} isAuth={isAuth}/>
    <div className='mainPage'>
    <Routes>
      
      <Route path='/' element = {<LoginPerfil setIsAuth= {setIsAuth}/>}/>
      <Route path='/login' element = {<LoginPerfil setIsAuth= {setIsAuth} onLogout={onLogout}/>}/>
      <Route path='/admin' element ={<GuardiaComponent isAuth={isAuth} setIsAuth={setIsAuth} Component={<AdminComponent/>}/>}/>
      <Route path='/personal' element={<TablaPersonal isAuth={isAuth} />}/>
      <Route path='/editar' element={< TablaPersonal/>} isAuth={isAuth} Component={<AdminComponent/>}/>
      <Route path='/suministros' element={<MenuAdmin isAuth={isAuth} Component={<AdminComponent/>}/>}/>
      <Route path='/almacen' element={<MenuAdmin isAuth={isAuth} Component={<AdminComponent/>}/>}/>
      <Route path='/registros' element={<RegistroPersonal />}/>
    </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App
