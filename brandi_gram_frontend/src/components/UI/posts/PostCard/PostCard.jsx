import CardWrapper from "../../CardWrapper/CardWrapper"
import Image from "../../Image/Image"
import Button from "../../Button/Button"

export default function PostsCard({price, image, redirectLink, descripiton}){

    function redirectPost(){
        console.log('console')
        // TODO: redirectLink use redirect link
        
    }
    return (
        <CardWrapper>
            <div className="posts-card--header">
                <Image link={image} />
            </div>
            <div className="posts-card--body">
                <p className="posts-card--price-list"><span>price:</span> {price}$</p>
                <div className="posts-card--description"><span>Description:</span> 
                    {descripiton}
                </div>
            </div>
            <div className="posts-card--footer">
                <Button action={redirectPost}>Link for post</Button>
            </div>
        
        </CardWrapper>
    )
}