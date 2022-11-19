import { useState } from "react"
import CardWrapper from "../../UI/CardWrapper/CardWrapper"
import Button from "../../UI/Button/Button"
import { API_URI } from "../../../services/Api";
import { redirect, useNavigate } from "react-router-dom";
export default function Login() {
    const [phone_number, setPhoneNumber] = useState('998158661')
    const [password, setPassword] = useState('tester123465')
    const [error, setError] = useState('')
    let navigate = useNavigate();

    const [buttonState, setButtonState] = useState(false)


    async function submit(){

        setButtonState(true);

        const loginInformations = {
            phone_number: phone_number,
            password: password,

        }

        const response = await fetch(API_URI+'/login',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, HEAD, OPTIONS"
            },
            body: JSON.stringify(loginInformations),
        })
        const loginInfo = await response.json();
        setButtonState(false);
        console.log(loginInfo, 'login info')
        if(!loginInfo.success && loginInfo.detail){
            setError(loginInfo.detail)
        }else if(loginInfo.access){
            localStorage.setItem('token', loginInfo.access);
            alert('You have successfuly loged in')
            navigate("/");
        }
    }

    return (
        <div className="auth-form--container">
            <CardWrapper>
                <div className="auth-card--header card-padding">Login</div>
                <div className="auth-card-body card-padding">
                    <label htmlFor="phoneNumber">phone Number</label>
                    <input type="text" value={phone_number} name="phoneNumber" className="input card-input" onChange={(e) => setPhoneNumber(e.target.value)} />
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" value={password} name="lastName" className="input card-input" onChange={(e) => setPassword(e.target.value)} />
                    <div style={{color: 'red'}}>{error}</div>
                
                    <div className="card-button--container">
                        <Button action={submit} disabled={buttonState}/>
                    </div>
                
                </div>
            </CardWrapper>
        </div>
    )
}