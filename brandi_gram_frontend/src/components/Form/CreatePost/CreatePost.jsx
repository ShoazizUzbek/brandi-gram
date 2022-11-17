import { useState } from "react";
import CardWrapper from "../../UI/CardWrapper/CardWrapper";

export default function CreatePost(){
    const [post_url, setPostUrl] = useState('');
    const [price, setPrice] = useState(0)
    const [descripiton, setDescripiton] = useState('')
    const [tags, setTags] = useState('')


    return (
        <CardWrapper>
            <div className="create-post--header">Add new Post</div>
            <div className="create-post--body">
                <input type="text" value={post_url} className="input"/>
                <input type="text" value={price} className="input"/>
                <input type="text" value={descripiton} className="input"/>
                <input type="text" value={tags} className="input"/>
            </div>
        </CardWrapper>
    )
}