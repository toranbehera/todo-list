import { useState } from "react"
import TestingCard from "./testingCard";


export default function TestingField(){
    const [inputText, setInputText] = useState('');
    const [list, setList] = useState<string[]>([]);

    const handleClick = (text: string) => {
        setList([...list, text]);
    }

    const deleteItem = (index: number) => {
        setList(list.filter((_e, i) => i !== index));
    }

    return (
        <div style={{ justifySelf:'center', margin: 20}}>
            <input type="text" onChange={(e) => setInputText(e.target.value)} placeholder='enter'/>
            <button onClick={() => handleClick(inputText)}>Button</button>
            {list.map((item, index) => (
                <div key={index}>
                   <TestingCard item={item} index={index} handleClick={() => deleteItem(index)}/> 
                </div>
            ))}
        </div>
    )
}
