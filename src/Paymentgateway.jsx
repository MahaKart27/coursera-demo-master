import React, { useEffect } from 'react'
import { useState } from 'react'
function Paymentgateway() {
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [amount,setAmount]=useState("")
    const course = sessionStorage.getItem('course') || 'Default Course';
    const name1 = sessionStorage.getItem("username") || "DEfauldf"
    function handleChange(e){
        setAmount(e.target.value)
    }
    async function Pay() {
      const name1 = sessionStorage.getItem("username");
      const course = sessionStorage.getItem("course");
      console.log(name1,course) // Replace with your course data
  
      try {
          const response = await fetch("http://localhost:5000/api/pay", {
              method: "POST",
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  "name": name1,
                  "course": course
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
  
  
  return (
    <>
    <header className='' style={{backgroundColor:"black",textAlign:"center",color:"aliceblue",fontSize:"1.25rem"}}>Payment gateway</header>
    <div style={{height:"94vh",backgroundColor:"aliceblue",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <div style={{height:"400px",width:"300px",backgroundColor:"black"}}>
        <h4 style={{color:"aliceblue",height:"20px",textAlign:"center"}}>Payment</h4> 
        <h6 style={{color:"white",marginLeft:"20px",marginTop:"20px"}}>Username: {name}</h6>
        <h6 style={{color:"white",marginLeft:"20px",marginTop:"10px"}}>Courseid: {course}</h6>       
        <input onChange={handleChange} type="number" style={{backgroundColor:"aliceblue",height:"30px",border:"none",outline:"none",borderRadius:"25px",padding:"10px",fontSize:"15px",marginLeft:"10px",paddingLeft:"10px",marginRight:"10px",}} placeholder='Amount' />
        
        <button onClick={Pay}  className='btn btn-sm' style={{backgroundColor:"aliceblue",borderRadius:"20px"}}>Pay</button>

        </div>

    </div>
    </>
  )
}

export default Paymentgateway