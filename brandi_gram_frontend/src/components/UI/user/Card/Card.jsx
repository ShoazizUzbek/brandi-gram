import CardWrapper from "../../CardWrapper/CardWrapper"
import Image from "../../Image/Image"
import Button from "../../Button/Button"
import { IMAGE_URI } from "../../../../services/Api"
import { Link } from "react-router-dom";


import './Card.css'
import { useEffect, useState } from "react";

export default function Card({ username, profilePicture, tags, followers, lastPosts, id }) {

    const [followersCount, setFollowersCount] = useState(0)

    useEffect(()=>{
        // parseInt(followers) / 1000 >= 1 ? '' + (parseInt(followers) / 1000).split('.')[0]
        if(parseInt(followers) / 1000 >= 1){
            let followersDev = (parseInt(followers) / 1000) + '';
            let splitNum = followersDev.split('.');
            setFollowersCount(followersDev.split('.')[0]+'K')
        }else{
            setFollowersCount(followers)
        }


    },[followers])

    return (
        <CardWrapper>
            <div className="card--header">
                <div className="card--profileImage">
                    <Image link={profilePicture} shape="circle" />
                </div>
                <div className="card--userInfo">
                    <p className="card--userInfo--userName">@{username}</p>
                    <div className="card--userInfo--tags">
                        {tags ? tags.map((tag, index) => (
                            <Button type="grey" shape="oval" text={tag} key={index}/>
                        )) : ''}
                    </div>
                </div>

            </div>
            <div className="card--devider--info">
                <p>{followersCount} followers</p>
            </div>
            <div className="card--profile-last-posts">
                {lastPosts ? lastPosts.map((post, index) => (
                    <div style={{width: "25%",margin: "5px"}}>
                        <Image link={post} shape="oval" />
                    </div>

                 )) : ''} 
            </div>
            <div style={{ margin: "5px" }}>
                <div className="card-button--container" >
                    <Link to={'/profile/detail/' + id}><Button text="More info" /></Link>
                </div>
            </div>
        </CardWrapper>
    )
}