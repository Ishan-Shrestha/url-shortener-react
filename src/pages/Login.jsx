import { useState } from "react"
import { useNavigate } from "react-router-dom";

const url = 'http://127.0.0.1:5000/login'

function Login(){
    const [ id, setId ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const payload = {
            'id': id,
            'password':password
        }
        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
                })
            if (!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (data.success){
                localStorage.setItem('token', data.token);
                navigate('/shorten');
            } else {
                alert(data.message);
            }
        }
        catch(error){
            console.log(`Fetch Error: ${error}`);
        }
    }
    return(
        <>
        <form onSubmit={ handleSubmit }>
            <input type="text" 
                value={id} 
                onChange={(e)=>setId(e.target.value)} 
                placeholder="Enter Your ID"></input>
            <input type="password" 
                value={password} 
                onChange={(e)=>setPassword(e.target.value)} 
                placeholder="Enter Your password"></input>
            <button type="submit">submit</button>
        </form>
        </>
    )
}

export default Login