import { useEffect } from "react"
import Nav from "../components/UI/Nav/Nav"
import { useParams } from 'react-router-dom';
import { API_URI } from "../services/Api";
export default function Profile({}){
    const {profileId} = useParams();

    const [profileList, setProfileList] = useEffect({})


    useEffect(()=>{
        getProfileInfo()
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
            const getProfileList = response.json();

            console.log(getProfileList);

            setProfileList(getProfileList);


        }else{
            console.log('profileId not found')
        }
    

    }



    return (
        <>
            <Nav />
            <div>
                <div className="profile-navbar">
                    <div className="navbar--logo">
                        {profileList.username}
                        {profileList && profileList.category ? profileList.category.map(tag=>(
                            <Button type="grey" shape="oval" text={tag}/>
                        )) : ''}
                    </div>
                    <div className="profile">
                        {/* <CgProfile /> */}
                    </div>
                </div>
                <div className="profile-category--lists">
                    
                </div>
                <div className="profile-card-lists">

                </div>


            </div>
        
        </>
    )
}