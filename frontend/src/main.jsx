import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoginPerfil from './components/LoginPerfil.jsx'

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

  return (
    <div className='mainContainer'
    >{isAuth ? <App/> : <LoginPerfil setIsAuth={setIsAuth}/>} </div>
    

  )
}