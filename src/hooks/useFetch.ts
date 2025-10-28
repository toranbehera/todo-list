import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function useFetch<T>(url: string){
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try{
            const response = await axios.get(url);
            setData(response.data);
        } catch (error: any){
            setError(error.message);
        }
    }, []); 

    useEffect(() => {
        fetchData();
        console.log('fetchData rerendered');
    }, [fetchData]);
    
    return {data, error, refetch: fetchData};
}
