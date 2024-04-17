import React, { useState } from 'react'

function Register() {
    const [name,setName]=useState("")
    const [pass,setPass]=useState("")
    const [mail,setMail]=useState("")
    async function Register() {
        
    
        try {
            const response = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username:name,
                    password:pass,
                    email:mail
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data); // Handle response data here
            } else {
                throw new Error('Failed to process payment');
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    function handleNmae(e){
        setName(e.target.value)
    }
    function handlePass(e){
        setPass(e.target.value)
    }
    function handlemail(e){
        setMail(e.target.value)
    }
  return (
    <div>
        <h1>Regisration</h1>
        <input onChange={handleNmae} placeholder='Please enter your name'/>
        <input onChange={handlePass} placeholder='Please enter your password'/>
        <input onChange={handlemail} placeholder='Please neret your email'/>
        <button onClick={Register}>Register</button>
    </div>
    

  )
}

export default Register