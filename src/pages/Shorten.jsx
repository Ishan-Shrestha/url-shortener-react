import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Shorten(){
    const naviagte = useNavigate();
    const url = 'http://127.0.0.1:5000/shorten';
    const [ originalUrl, setUrl ] = useState('');
    const [ shortUrl, setShortUrl ] = useState('')
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const payload = {
            'url': originalUrl
        }

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: {  'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payload)
            });
            if (!response.ok){
                throw new Error(`Error: ${response.status}`)
            }
            const data = await response.json();
            if (data.success){
                setShortUrl(data.short_url)
            } else {
                alert(data.message);
            }
        } catch(error) {
            console.log(`Error: ${error}`)
        }
    }

    return(
        <>
        <h1>Shorten</h1>
        <form onSubmit={ handleSubmit }>
            <input type="text"
            value={originalUrl}
            onChange={(e)=>{setUrl(e.target.value)}}
            placeholder="enter the url to shorten"></input>
            <button type="submit" >submit</button>
        </form>
        {shortUrl && <p>Short URL: {shortUrl}</p>}
        </>
    )
}

export default Shorten