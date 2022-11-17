import CardWrapper from "../../CardWrapper/CardWrapper"
import Image from "../../Image/Image"
import Button from "../../Button/Button"

import './Card.css'

export default function Card ({username, profilePicture, tags, followers, lastPosts}){



    return (
        <CardWrapper>
            <div className="card--header">
                <div className="card--profileImage">
                   <Image link={profilePicture} shape="circle" /> 
                </div>
                <div className="card--userInfo">
                    <p className="card--userInfo--userName">@{username}</p>
                    <div className="card--userInfo--tags">
                        {tags.map(tag=>(
                            <Button type="grey" shape="oval" iconType="hash">{tag}</Button>
                        ))}
                    </div>
                </div>
                
            </div>
            <div className="card--devider--info">
                <p>{parseInt(followers) / 1000 >= 1 ? (parseInt(followers) / 1000) + 'k' : followers} followers</p>
            </div>
            <div className="card--profile-last-posts">
                {lastPosts.map(post=>(
                    <Image link={post.img} shape="oval" />

                ))}
            </div>
        </CardWrapper>
    )
}