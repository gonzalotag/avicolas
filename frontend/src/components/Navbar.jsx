import "../assets/css/navBar.css"

function Navbar(props){
    const{onLogout, isAuth}= props;
    return <div className="navbar">
        <div className="icono">
            granja avicola
        </div>
        <div className="espacioDeNavbar">
            espacio libre
        </div>
        <div className="buttonLogout" >
            {isAuth ? <button onClick={()=>{onLogout()}}>cerrar sesion</button>: <></>}
        </div>
        
    </div>
}

export default Navbar;