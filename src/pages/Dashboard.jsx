import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard(){
    const naviagte = useNavigate();
    const base_url = 'http://127.0.0.1:5000';
    const [ url_data, setUrlData ] = useState([]);
    const loadDashboard = async ()=>{
            try{
                const response = await fetch(`${base_url}/dashboard`, {
                headers: {  'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }});
                if (!response.ok){
                    throw new Error(`Error: ${response.status}`)
                }
                const data = await response.json();
                setUrlData(data.data)
            }catch(error){
                console.log(`Error: ${error}`);
            }
        };
    const handleDelete = async (id)=>{
        try{
            const response = await fetch(`${base_url}/delete_link/${id}`,
                {method:'POST', 
                headers:{ 'Content-Type':'application/json',
                        'Authorization':`Bearer ${localStorage.getItem('token')}`
                }
                }
            );
            if (!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (data.success){
                loadDashboard();
            }
        } catch(error){
            console.log(`Error: ${error}`)
        }
    };

    useEffect(()=>{
        loadDashboard();

    }, []); 

    return(
        <>
        <table>
        <thead>
            <tr>
            <th>originalUrl</th>
            <th>shortUrl</th>
            <th>clicks</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {url_data.map((url)=>(
                <tr key={url.id}>
                    <td>{url.original_url}</td>
                    <td>{url.short_url}</td>
                    <td>{url.clicks}</td>
                    <td>
                        <button onClick={ ()=>handleDelete(url.id) }>
                            Delete
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
        </table>
        </>
    )
}

export default Dashboard