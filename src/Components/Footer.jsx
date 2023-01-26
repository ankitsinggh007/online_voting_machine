import React, { useState } from 'react'
import "./Footer.css"
import logo from "../Media/voteLogo.png"
import Swal from 'sweetalert2'
function Footer() {
  const [Feed, setFeed] = useState({
    email:"",
    mes:"",
  })
  const Feedback =(e)=>{
    e.preventDefault();
    console.log("hi")
   if(Feed.email &&Feed.mes){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    
   }
  }
  return (
    <div style={{border:"1px solid black"}}><footer className="footer-distributed">

    <div className="footer-left">

      <h3><img src={logo} height="50px" width="50px"/></h3>

      <p className="footer-links">
        <a href="#">Home</a>
        ·
        <a href="#">Blog</a>
        ·
        <a href="#">Pricing</a>
        ·
        <a href="#">About</a>
      </p>

      <p className="footer-company-name">Votify © 2022</p>

      <div className="footer-icons">

        <a href="#"><i className="fa fa-facebook">V</i></a>
        <a href="#"><i className="fa fa-twitter">O</i></a>
        <a href="#"><i className="fa fa-linkedin">T</i></a>
        <a href="#"><i className="fa fa-github">E</i></a>

      </div>

    </div>

    <div className="footer-right">


      <form action="#" method="post" >
      <div style={{textAlign:"center",color:"white",marginBottom:"15px"}}>Contact Us</div>

        <input type="text" name="email"onChange={(e)=>setFeed({...Feed,email:e.target.value})} required placeholder="Email"/>
        <textarea name="message" required onChange={(e)=>setFeed({...Feed,mes:e.target.value})} placeholder="Message"></textarea>
<div style={{display:"flex",justifyContent:"center"}}>
<button onClick={Feedback} style={{marginLeft:"25px"}}>Send</button>

</div>
      </form>

    </div>

  </footer></div>
  )
}

export default Footer