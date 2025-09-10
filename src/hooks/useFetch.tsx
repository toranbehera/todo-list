import { useEffect, useState } from "react";

export default function useFetch<T>(url: string){
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch(url);
                if(!response.ok){
                    throw new Error(`Response status: ${response.status}`);
                } else{
                    const data = await response.json();
                    setData(data);
                }
            } catch(error: any) {
                console.log(error.message);
                setError(error.message);
            }
        } 
        
        fetchData();
    });
    return {data, error};
}
