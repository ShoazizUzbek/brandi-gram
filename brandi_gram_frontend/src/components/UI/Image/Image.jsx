import './Image.css'
export default function Image({ link, classList = '', alt = 'Image', shape = 'default' }) {
    return (
        <img src={link} alt={alt} className={`image ${classList} ${shape}`} />
    )
}