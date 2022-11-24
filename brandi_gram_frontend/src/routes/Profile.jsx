import { useEffect, useState } from "react"
import Nav from "../components/UI/Nav/Nav"
import { useParams } from 'react-router-dom';
import { API_URI } from "../services/Api";
import Button from "../components/UI/Button/Button";
import PostsCard from "../components/UI/posts/PostCard/PostCard";
import {AiOutlinePlusCircle} from "react-icons/ai/index.esm";
import { Link } from "react-router-dom";
import Image from "../components/UI/Image/Image";

export default function Profile({}){
    const {profileId} = useParams();

    const [profileList, setProfileList] = useState({})
    const [login, setLogin] = useState('');
    const [followersCount, setFollowersCount] = useState('');


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
            if(parseInt(getProfileList.followers) / 1000 >= 1){
                let followersDev = (parseInt(getProfileList.followers) / 1000) + '';
                let splitNum = followersDev.split('.');
                setFollowersCount(followersDev.split('.')[0]+'K')
            }else{
                setFollowersCount(getProfileList.followers)
            }
    


        }else{
            console.log('profileId not found')
        }
    

    }
    // Posts type
    // 'id': post.id,
    //  'post_url': post.post_url,
    //  'post_image': post_img,
    //  'price': post.price,
    //  'description': post.description,
    //  'title': post.post_title


    return (
        <>
            <Nav />
            <div style={{padding: "40px"}}>
                <div className="profile-navbar">
                    <div className="navbar--logo">
                        <div className="profile-nav--logo" style={{display: 'flex', alignItems: "center"}}>
                            <div style={{width: "20%", marginRight: "10px"}}>
                             <Image link={profileList.profile_picture} shape="circle" />

                            </div>

                            <a href={profileList.profile_url} target='_blank' className="profile_url"  >{profileList.username}</a>
                            
                        </div>
                        <div style={{marginLeft: "10px", marginBottom: "10px"}}> 
                        {followersCount}
                        </div>
                        {profileList && profileList.category && profileList.category.length > 0 ? profileList.category.map((tag, index)=>(
                            <Button type="grey" shape="oval" text={tag} key={index} />
                        )) : ''}
                    </div>
                    <div className="profile" style={{fontSize: "35px"}}>
                        {login && profileId ? <Link to={'/create-post/'+profileId} style={{textDecoration: 'none', color: 'black'}}><AiOutlinePlusCircle /></Link> : ''}
                        {/* <CgProfile /> */}
                    </div>
                </div>
                <div className="profile-list--container">
                
                    {profileList && profileList.posts && profileList.posts.length > 0 ? profileList.posts.map((item, index)=>(
                        <div style={{marginLeft: "5px", marginRight: "5px", width: "20%"}}><PostsCard price={item.price} image={item.post_image} descripiton={item.description} title={item.title} redirectLink={item.post_url} key={index}/></div>
                    )) : ''}
                    {/* <div style={{marginLeft: "5px", marginRight: "5px"}}><PostsCard price={'15$'} image={profileList.profile_picture} descripiton={'Some thisty'} title={'Some thisty'} redirectLink={'link.uz'} /></div> */}

                        
                </div>
                <div className="profile-card-lists">

                </div>


            </div>
        
        </>
    )
}