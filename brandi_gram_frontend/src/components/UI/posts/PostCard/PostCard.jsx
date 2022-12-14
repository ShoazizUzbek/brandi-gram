import CardWrapper from "../../CardWrapper/CardWrapper"
import Image from "../../Image/Image"
import Button from "../../Button/Button"
import './PostCard.css'

export default function PostsCard({price, image, redirectLink, descripiton, title}){

    function redirectPost(){
        console.log('console')
        window.location.replace(redirectLink);
        
    }
    return (
        <CardWrapper>
            <div className="posts-card--header">
                <Image link={image} />
            </div>
            <div className="posts-card--body">
                <p className="posts-card--price-list"><span>Price: </span> {price} sum</p>
                <div className="posts-card--description"><span>Description: </span> 
                    {descripiton}
                </div>
                <p className="posts-card--price-list"><span>Instagram Information: </span>{title}</p>

            </div>
            <div className="posts-card--footer">
                <Button action={redirectPost} text="Link for post"></Button>
            </div>
        
        </CardWrapper>
    )
}