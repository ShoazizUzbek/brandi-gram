import { useEffect, useState } from "react"
import Button from "../Button/Button";

export default function MultiSelect({ incomingList, name, id, newSelections }) {


    useEffect(() => {
        setList(incomingList);
    }, [incomingList])

    const [list, setList] = useState();
    const [selectedList, setSelectedList] = useState([])

    const changeSelect = (e) => {
        const selectedValue = list.filter(item => item.id == e.target.value)
        let itemsId = []
        for(let i = 0; selectedList.length > i; i++){
            itemsId.push(selectedList[i].id)
        }
        setSelectedList([...selectedValue, ...selectedList]);
       
        itemsId.push(parseInt(e.target.value))
        newSelections(itemsId);
    }

    if (list && list.length > 0) {
        return (
            <div className="select-contaienr">
                {selectedList && selectedList.length > 0 ? selectedList.map(item => (
                    <div style={{margin: '2px', display: 'inline'}} key={item.id}><Button shape="oval" text={item.name} type='hash' iconType="FaTrash"/></div>
                )) : ''}
                <select name={name} id={id} onChange={(e) => changeSelect(e)} className="input">
                    <option value={0} key={0}>Select</option>

                    {list.map(item => (
                        <option value={item.id} key={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
        )
    }
    else {
        return;
    }

}