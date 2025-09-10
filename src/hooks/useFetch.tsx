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

        // fetch(url)
        //     .then(res => {
        //         if (!res.ok) {
        //             throw new Error(`Response status: ${res.status}`);
        //         }
        //         return res.json();
        //     })
        //     .then((data) => {
        //         setData(data);
        //         setError(null);
        //     })
        //     .catch(e => {
        //         if (e.name === 'AbortError') {
        //             console.log('fetch aborted');
        //         } else {
        //             setError(e.message);
        //         }
        //     });

    });
    return {data, error};
}
