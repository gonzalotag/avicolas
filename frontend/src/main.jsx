import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPerfil from './components/LoginPerfil.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Controller/>
  </React.StrictMode>,
)

function Controller (){
  const [isAuth, setIsAuth] = useState (false);

  useEffect(() => {
    const userInfo = localStorage.getItem ('userInfo');
    if (userInfo){
      setIsAuth(true);
    
    }   

  }), []
  const onLogout=()=>{
    localStorage.removeItem('userInfo');
    window.location.reload()
   }
  return (
    <div className='mainContainer'>
      <Navbar onLogout={onLogout} isAuth={isAuth}/>

      <div className='mainPage'>
        
      {isAuth ? <App/> : <LoginPerfil setIsAuth={setIsAuth}/>} 
      </div>
      <Footer/>
    </div>

  )
}