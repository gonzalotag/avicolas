import "../assets/css/buttonComponent.css"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ButtonComponent(props){
    const {nombreButton, iconoButton, isSelected} = props
    return <div className="buttonContainer" >
            {iconoButton}
            <p>{nombreButton}</p>
            <FontAwesomeIcon icon={faChevronLeft} />
    </div>
}
export default ButtonComponent;