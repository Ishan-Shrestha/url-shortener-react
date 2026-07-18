import { useState } from "react"
import { useNavigate } from "react-router-dom"

const url = 'http://127.0.0.1:5000/register'

function Register(){
    const [ id, setId ] = useState('');
    const [ password, setPassword ] = useState('');
    const naviagte = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const payload = {
            'id' : id,
            'password' : password
        };

        try{
            const response = await fetch(url, {
                method:'POST',
                headers:{'content-type':'application/json'},
                body: JSON.stringify(payload)
            });
            if (!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            if (data.success){
                localStorage.setItem('token', data.token);
                naviagte('/shorten');
            } else {
                alert(data.message);
            }
        }
        catch(error){
            console.log(`Error fetching: ${error}`);
        }
    }

    return(
        <>
        <form onSubmit={ handleSubmit }>
            <input type="text"
                value={id}
                onChange={(e)=>{setId(e.target.value)}}
                placeholder="Enter an ID"></input>
            <input type="password"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                placeholder="Enter a password"></input>
            <button type="submit">Submit</button>
        </form>
        </>
    )
}

export default Register