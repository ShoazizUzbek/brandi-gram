import { useEffect, useState } from "react";
import CardWrapper from "../../UI/CardWrapper/CardWrapper";
import { useNavigate } from "react-router-dom";
import { API_URI } from "../../../services/Api";
import Button from "../../UI/Button/Button";
import { useParams } from 'react-router-dom';



export default function CreatePost(){
    const {profileId} = useParams();

    const [post_url, setPostUrl] = useState('');
    const [price, setPrice] = useState(0)
    const [descripiton, setDescripiton] = useState('')
    const [tags, setTags] = useState('')
    const [buttonState, setButtonState] = useState(false)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('')
    let navigate = useNavigate();

    useEffect(()=>{
        getTags()
    },[])

    async function getTags(){
        const response = await fetch(API_URI + '/tag', {
            method: 'GET',
            headers:{
                "Content-Type": "text/plain",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            }
        });
        const dataCategory = await response.json();

        // setCategoryList(dataCategory);


    }


    async  function submit(){
        setButtonState(true);
        setLoading('Loading')

        const postInformation = {
            post_url: post_url,
            price: price,
            description: descripiton,
            tags: [],
            profile_id: profileId

        }

        const response = await fetch(API_URI+'/post/create',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS",
                "Authorization": `Bearer ${localStorage.getItem('token')}`

            },
            body: JSON.stringify(postInformation),

        })
        const postInfo = await response.json();
        setButtonState(false);
        console.log(postInfo)
        if(!postInfo.success && postInfo.detail){
            setError(postInfo.detail)
        }else{
            navigate("/profile/detail/"+profileId);
            
        }
        setLoading('')
    }


    return (
        <div className="auth-form--container">
        <CardWrapper>
            <div className="auth-card--header card-padding">Add new Post</div>
            <div className="auth-card-body card-padding">
                <label htmlFor="firstName">Post Url</label>
                <input type="text" value={post_url} className="input card-input" onChange={e=>setPostUrl(e.target.value)}/>
               
                <label htmlFor="firstName">Price</label> 
                <input type="text" value={price} className="input card-input" onChange={e=>setPrice(e.target.value)}/>
                <label htmlFor="firstName">Description</label>
                <input type="text" value={descripiton} className="input card-input" onChange={e=>setDescripiton(e.target.value)}/>
                {/* <label htmlFor="firstName">Tags</label>
                <input type="text" value={tags} className="input card-input" onChange={e=>setTags(e.target.value)}/> */}
                <div className="card-button--container">
                    <Button action={submit} disabled={buttonState} text={loading ? loading : 'Submit'}/>
                </div>
            </div>
        </CardWrapper>
        </div>
    )
}