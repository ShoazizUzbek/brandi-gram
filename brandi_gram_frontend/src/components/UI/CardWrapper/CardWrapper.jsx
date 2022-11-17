import './CardWrapper.css'
export default function CardWrapper ({children}) {
    return (
        <div className="container--card">
            {children}
        </div>
    )
}