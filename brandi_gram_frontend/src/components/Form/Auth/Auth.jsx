import { useState } from "react";
import CardWrapper from "../../UI/CardWrapper/CardWrapper";
import Button from "../../UI/Button/Button";

export default function Auth(){

    const [first_name, setFirstName] = useState(null)
    const [last_name, setLastName] = useState(null)
    const [phone_number, setPhoneNumber] = useState(null)
    const [profile_url, setProfileUrl] = useState(null)
    const [category, setCategory] = useState(null)
    const [password, setPassword] = useState(null)

    function submit(){

    }

    return(
        <CardWrapper>
            <div className="auth-card--header">Authentification</div>
            <div className="auth-card-body">
                <input type="text" value={first_name} className="input"/>
                <input type="text" value={last_name} className="input"/>
                <input type="password" value={password} className="input"/>
                <input type="text" value={phone_number} className="input"/>
                <input type="text" value={profile_url} className="input"/>
                <input type="text" value={category} className="input"/>
                <Button action={submit} />
            </div>
        
        </CardWrapper>
    )


}