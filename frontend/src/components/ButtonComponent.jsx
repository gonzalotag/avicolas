import "../assets/css/buttonComponent.css"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ButtonComponent(props){
    const {nombreButton, iconoButton, isSelected} = props


    return <div className="buttonContainer " >
        <div className="iconoButton">
            {iconoButton}
        </div>
        <div className="nombreButton">
            <p>{nombreButton}</p>
        </div>
        <div className="chevron">
            <FontAwesomeIcon icon={faChevronLeft} />
        </div>
    </div>
}

export default ButtonComponent;