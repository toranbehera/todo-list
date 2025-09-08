export default function TestingCard({item, index, handleClick}: {item: string, index: number, handleClick: () => void}){
    return (
        <div style={{display:'flex', justifyContent: 'space-between', margin: '10px 0px'}}>
            <p>{item}</p>
            <div style={{display: 'flex', gap: 20}}>
                <p style={{textOverflow:'hidden'}}>{index}</p>
                <button
                    style={{padding: 10}}
                    onClick={() => handleClick()}
                >
                    X
                </button>  
            </div>
        </div>
    )
}
