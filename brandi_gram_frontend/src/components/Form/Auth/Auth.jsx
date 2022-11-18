import { useEffect, useState } from "react";
import CardWrapper from "../../UI/CardWrapper/CardWrapper";
import Button from "../../UI/Button/Button";
import './Auth.css'
import { API_URI } from "../../../services/Api";
import MultiSelect from "../../UI/MultiSelect/MultiSelect";

export default function Auth() {

    const [first_name, setFirstName] = useState('tester')
    const [last_name, setLastName] = useState('tester')
    const [phone_number, setPhoneNumber] = useState('998158661')
    const [profile_url, setProfileUrl] = useState('https://www.instagram.com/terraprowear/')
    const [category, setCategory] = useState([])
    const [password, setPassword] = useState('tester123465')
    const [categoryList, setCategoryList] = useState([])
    const [buttonState, setButtonState] = useState(false)
    const [error, setError] = useState('')
    
    useEffect(()=>{
        getCategoryList();
    }, [])

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

    async function submit() {

        setButtonState(true);

        const loginInformations = {
            first_name: first_name,
            last_name: last_name,
            phone_number: phone_number,
            password: password,
            profile_url: profile_url,
            category: category,

        }
        console.log(loginInformations);

        const response = await fetch(API_URI+'/registration',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"

            },
            body: JSON.stringify(loginInformations),

        })
        const authInfo = await response.json();
        setButtonState(false);
        console.log(authInfo)
        if(!authInfo.success && authInfo.detail){
            setError(authInfo.detail)
        }
    }
    function newCategorySelect(newCategoryLits){
        setCategory(newCategoryLits)
    }   

    return (
        <div className="auth-form--container">
            <CardWrapper>
                    <div className="auth-card--header card-padding">Registration</div>
                    <div className="auth-card-body card-padding">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" value={first_name} name="firstName" className="input card-input" onChange={(e)=>setFirstName(e.target.value)}/>
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" value={last_name} name="lastName" className="input card-input" onChange={(e)=>setLastName(e.target.value)}/>
                        <label htmlFor="password">Password</label>
                        <input type="password" value={password} name="password"  className="input card-input" onChange={(e)=>setPassword(e.target.value)}/>
                        <label htmlFor="phoneNumber">Phone number</label>
                        <input type="text" value={phone_number} name="phoneNumber"  className="input card-input" onChange={(e)=>setPhoneNumber(e.target.value)} />
                        <label htmlFor="profileUrl">Profile Url</label>
                        <input type="text" value={profile_url} name="profileUrl" className="input card-input" onChange={(e)=>setProfileUrl(e.target.value)} />
                        <label htmlFor="category">Category</label>
                        {/* <input type="text" value={category} name="category" className="input card-input" onChange={(e)=>setCategory(e.target.value)} /> */}
                        {categoryList && categoryList.length > 0 ? <MultiSelect name="category" id="category" incomingList={categoryList} newSelections={newCategorySelect}/> : ''}
                        <div style={{color: 'red'}}>{error}</div>
                        <div className="card-button--container">
                            <Button action={submit} disabled={buttonState}/>
                        </div>
                    </div>
            </CardWrapper>
        </div>
    )


}