import './Image.css'
import { IMAGE_URI } from '../../../services/Api'
export default function Image({ link, classList = '', alt = 'Image', shape = 'default' }) {
    return (
        <img src={IMAGE_URI + link} alt={alt} className={`image ${classList} ${shape}`} />
    )
}