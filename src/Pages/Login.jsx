import React,{useEffect,useContext} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Input, Label, FormText } from "reactstrap"
import { Typography } from '@material-ui/core';
import { FormControl,InputLabel,InputAdornment } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import classes from "./Login.module.css";
import userData from "../Components/Store";
import {Alert} from 'reactstrap';
function Login() {
  const {Auth,setAuth,registerUser,setMessage,Message,loginUser,setRegister}=useContext(userData);
  const handleSubmit = (event) => {
    event.preventDefault();

    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
    if(Auth.email===""){
        setMessage("email can't be null");
    }
    else{

    if (emailRegex.test(Auth.email)) {
        if (Auth.password !== "") {
            
            
          loginUser(Auth.email,Auth.password);
        }
        else {
            setMessage("Password can't be null");
        }
    }
    else {
        setMessage("email is wrong")
    }
};
}
const toggle=()=>{
  setRegister(false);
}
  return (<>
            <form className={classes.form}>
              <div className={classes.head}>Login</div>
              {Message.length!=0 && <Alert color="primary">
                {Message}
                </Alert>}

              <div className={classes.email}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" onChange={(e)=>setAuth({...Auth,email:e.target.value})} />
              </div>
              <div className={classes.password}>
              <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e)=>setAuth({...Auth,password:e.target.value})}/>
              </div>
              <div className={classes.attribute}>
                <input type="checkbox"/>
                <label htmlFor='remember'>&nbsp; Remember me</label>
              </div>
              <div>
              <Button variant="contained" color="success" onClick={handleSubmit}  className={classes.button} >Log In</Button>
              </div>
              <p style={{color:"blue",cursor:"pointer",marginTop:"10px"}} onClick={toggle}>New user?Sign In</p>

            </form>
            </>
    )
}

export default Login