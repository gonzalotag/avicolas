
import { useEffect, useState } from 'react'
import './App.css'
import { getRolRequest } from './api/rol.api.js';


import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Route, Routes, useNavigate } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import LoginPerfil from './components/LoginPerfil';
import AdminComponent from './components/AdminComponent';
import GuardiaComponent from './components/GuardiaComponent';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const onLogout=()=>{
    localStorage.removeItem('userInfo');
    // window.location.reload()
    setIsAuth(false); 
    navigate('/');

   }
  return ( <>
  <Navbar onLogout={onLogout} isAuth={isAuth}/>
  <div className='mainPage'>
  <Routes> 
    <Route path='/' element = {<HomeComponent/>}/>
    <Route path='/login' element = {<LoginPerfil setIsAuth= {setIsAuth}/>}/>
    <Route path='/admin' element ={<GuardiaComponent isAuth={isAuth} setIsAuth={setIsAuth} Component={<AdminComponent/>}/> }/>
  </Routes>
  </div>
  <Footer/>
  </>
  );

//   const [rol, setRol] = useState('');
//   useEffect(() =>{
//     const userInfo = localStorage.getItem("userInfo");
//     const userInfoToObj = JSON.parse(userInfo);
//     // console.log(userInfoToObj);
//     getRol(userInfoToObj.id_rol);
//     //obtenerPagina();
//   }),[]

//  async function getRol (id){
//   const rolInfo= await  getRolRequest(id);
//   const nombreRol = rolInfo.data.tipo
//   // console.log(nombreRol);
//   setRol(nombreRol);
//   obtenerPagina();
//  }
//  const [page,setPage] = useState(<NotFound/>);
//  function obtenerPagina(){
//   if (rol === "administrador"){
//     setPage(<AdministradorPage/>);
//  }
 
//  }
//  const onLogout=()=>{
//   localStorage.removeItem('userInfo');
//   window.location.reload()
//  }
//   return (
//     <div className='appContainer'>
//       {/* <Navbar/> */}
//       {/* <button onClick={()=>{onLogout()}}>
//         loginout
//       </button> */}
//       {
//         page      
//       }
//       {/* <Footer/> */}
//     </div>
//   )

}

export default App
