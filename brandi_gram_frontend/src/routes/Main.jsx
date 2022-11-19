import { useEffect, useState } from "react"
import Nav from "../components/UI/Nav/Nav"
import { API_URI } from "../services/Api";
import Button from "../components/UI/Button/Button";
import Card from "../components/UI/user/Card/Card";
import { Link } from "react-router-dom";
export default function Main(){
    const [profileList, setProfileList] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [activeCategory, setActiveCategory] = useState([])


    useEffect(()=>{
        getUserList();
        getCategoryList();


    },[]);

    async function getCategoryList(){

        const response = await fetch(API_URI+'/category',{
            method: 'GET',
            headers:{
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            }

        })
        console.log(response)
        const dataCategory = await response.json();

        setCategoryList(dataCategory);
    }

    async function getUserList(){


        const response = await fetch(API_URI+'/profile/list', {
            method: 'GET',
            headers:{
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            }

        })
        console.log(response)
        const profileList = await response.json();

        setProfileList(profileList);
    }

    async function selectCategory(id){
        console.log(id, 'id')
        const response = await fetch(API_URI+'/profile/list?category_id='+id,{
            method: 'GET',
            headers:{
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            }
        });
        const profileUpdate = await response.json();
        setProfileList(profileUpdate)
    }

    return(<>
        <Nav />
        <div className="main">
            <div className="filter--container">
                {categoryList && categoryList.length > 0 ?  categoryList.map(item=>(
                    <Button shape="oval" text={item.name} type='hash' key={item.id} activeId={activeCategory} action={selectCategory} id={item.id}/>
                )) : ''}
            </div>
            <div className="profile-list--container">
                {profileList && profileList.length > 0 ?  profileList.map(item=>(
                        <div style={{marginLeft: "5px", marginRight: "5px"}} key={item.id}> <Card username={item.username} profilePicture={item.profile_picture} followers={item.followers} tags={item.category} id={item.id} lastPosts={item.posts}/></div>
                )) : ''}
            </div>
        </div>
    </>)
}