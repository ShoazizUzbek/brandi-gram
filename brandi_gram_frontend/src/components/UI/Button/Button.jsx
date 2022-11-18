import './Button.css'
import { FaHashtag, FaTrash } from "react-icons/fa";

export default function Button({shape = 'default', text = 'Submit', type = 'default', extraClasses = '', iconType = '', action, disabled = false, activeId, id}) {
    
    function buttonClicked(){
        if(id){
            action(id)
        }else{
            action()
        }
    }
    
    return(<button className={`button button-${type} ${shape} ${extraClasses}`} onClick={(e)=>buttonClicked(e)} disabled={disabled}>
            {iconType && iconType == 'hash' ? <FaHashtag /> : ''}{text}{iconType && iconType == 'FaTrash' ? <FaTrash /> : ''}
    </button>)

}