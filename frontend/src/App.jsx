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
import EditarPersonal from './components/EditarPersonal';
import Produccion from './components/Produccion';
import Reportes from './components/Reportes';


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
      <Route path='/produccion' element={<Produccion isAuth={isAuth} Component={<AdminComponent/>}/>}/>
      <Route path='/almacen' element={<Almacen isAuth={isAuth} Component={<AdminComponent/>}/>}/>
      <Route path='/registros' element={<RegistroPersonal isAuth={isAuth}/>}/>
      <Route path='/editar/:id' element={<EditarPersonal/>}  />
      <Route path='/reportes' element={<Reportes/>} isAuth={isAuth} />
      
    </Routes>
    </div>
    <Footer/>
    </>
  );
}

export default App
