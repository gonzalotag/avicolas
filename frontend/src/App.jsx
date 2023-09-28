
import { useEffect, useState } from 'react'
import './App.css'
import { getRolRequest } from './api/rol.api.js';
import AdministradorPage from './pages/AdministradorPage';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [rol, setRol] = useState('');
  useEffect(() =>{
    const userInfo = localStorage.getItem("userInfo");
    const userInfoToObj = JSON.parse(userInfo);
    // console.log(userInfoToObj);
    getRol(userInfoToObj.id_rol);
    //obtenerPagina();
  }),[]

 async function getRol (id){
  const rolInfo= await  getRolRequest(id);
  const nombreRol = rolInfo.data.tipo
  // console.log(nombreRol);
  setRol(nombreRol);
  obtenerPagina();
 }
 const [page,setPage] = useState(<NotFound/>);
 function obtenerPagina(){
  if (rol === "administrador"){
    setPage(<AdministradorPage/>);
 }
 
 }
 const onLogout=()=>{
  localStorage.removeItem('userInfo');
  window.location.reload()
 }
  return (
    <div className='appContainer'>
      {/* <Navbar/> */}
      {/* <button onClick={()=>{onLogout()}}>
        loginout
      </button> */}
      {
        page      
      }
      {/* <Footer/> */}
    </div>
  )
}

export default App
