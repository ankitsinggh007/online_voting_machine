import React, { useContext } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import pic1 from "../Media/pic1.jpg"
import pic2 from "../Media/pic2.jpg"
import pic3 from "../Media/pic3.jpg"
import pic4 from "../Media/pic4.jpg"
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Form,FormGroup,Input,Label,FormText} from "reactstrap"
import classes from "../Pages/LandingPage.module.css";
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import userData from '../Components/Store';
function LandingPage() {
 
        const {Register,setRegister}=useContext(userData);
 
 
    return (
    <div className={classes.main}>
        <div className={classes.crousal} >
        <Carousel autoPlay="true" autoFocus="true" emulateTouch="true" infiniteLoop="true" showArrows={false} showStatus={false} showThumbs={false}>
                <div stye={{border:"1px solid black"}}>
                    <img src={pic1}  height={"100%"} />
                </div>
                <div>
                    <img src={pic2} height={"100%"} />
                </div>
                <div>
                    <img src={pic3} height={"100%"}/>
                </div>
                <div>
                    <img src={pic4}  height={"100%"}/>
                </div>
            </Carousel>
        </div>
        <div className={classes.box}>

        { Register &&<Login/>}
        { !Register && <Signup/>}

        </div>
    </div>
  )
}

export default LandingPage;