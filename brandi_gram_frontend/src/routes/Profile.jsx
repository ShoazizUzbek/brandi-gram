import { useEffect, useState } from "react"
import Nav from "../components/UI/Nav/Nav"
import { useParams } from 'react-router-dom';
import { API_URI } from "../services/Api";
import Button from "../components/UI/Button/Button";
import PostsCard from "../components/UI/posts/PostCard/PostCard";
import {AiOutlinePlusCircle} from "react-icons/ai/index.esm";
import { Link } from "react-router-dom";

export default function Profile({}){
    const {profileId} = useParams();

    const [profileList, setProfileList] = useState({})
    const [login, setLogin] = useState('');


    useEffect(()=>{
        getProfileInfo()
        setLogin(localStorage.getItem('token'))
    }, [profileId])

    async function getProfileInfo(){

        if(profileId){
            const response = await fetch(API_URI+'/profile/detail/'+profileId, {
                method: 'GET',
                headers:{
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
                }
            });
            const getProfileList = await response.json();

            console.log(getProfileList);

            setProfileList(getProfileList);


        }else{
            console.log('profileId not found')
        }
    

    }



    return (
        <>
            <Nav />
            <div style={{padding: "40px"}}>
                <div className="profile-navbar">
                    <div className="navbar--logo">
                        <div className="profile-nav--logo">
                         {profileList.username}
                        </div>
                        {profileList && profileList.category && profileList.category.length > 0 ? profileList.category.map(tag=>(
                            <Button type="grey" shape="oval" text={tag}/>
                        )) : ''}
                    </div>
                    <div className="profile" style={{fontSize: "35px"}}>
                        {login && profileId ? <Link to={'/create-post/'+profileId} style={{textDecoration: 'none', color: 'black'}}><AiOutlinePlusCircle /></Link> : ''}
                        {/* <CgProfile /> */}
                    </div>
                </div>
                <div className="profile-category--lists">
                    {profileList && profileList.posts && profileList.posts.length > 0 ? profileList.posts.map(item=>(
                        <PostsCard price={item.price} image={item.image} descripiton={item.descripiton} redirectLink={item.redirectLink} />
                    )) : ''}
                        
                </div>
                <div className="profile-card-lists">

                </div>


            </div>
        
        </>
    )
}