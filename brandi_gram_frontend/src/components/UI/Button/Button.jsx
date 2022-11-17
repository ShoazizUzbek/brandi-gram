import './Button.css'
import { FaHashtag } from "react-icons/fa";

export default function Button({shape = 'default', text = 'Submit', type = 'default', extraClasses = '', iconType = '', action}) {
    return(<button className={`button button-${type} ${shape} ${extraClasses}`} onClick={(e)=>action()}>
            {iconType && iconType == 'hash' ? <FaHashtag /> : ''}{text}
    </button>)

}