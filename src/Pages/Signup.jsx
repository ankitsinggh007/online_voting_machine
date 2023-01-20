import React,{useEffect,useContext,useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Form, FormGroup, Input, Label, FormText } from "reactstrap"
import classes from "./Signup.module.css"
import { Select, Typography } from '@material-ui/core';
import userData from "../Components/Store";
import {Alert} from "reactstrap"

function Signup() {

     const {Auth,setAuth,registerUser,setMessage,Message,Register,setRegister}=useContext(userData);
   const submitForm=(event)=>{
        event.preventDefault();
        const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
if(Auth.PhoneNo===""){
    setMessage("Phone no. can't be null");
    
}
else{
        if(Auth.Firstname){
            if(emailRegex.test(Auth.email)){
              if(Auth.password===""&&Auth.Re_entered_password===""){
                setMessage("Password can't be null");
              }
              else if(Auth.password===Auth.Re_entered_password){
                    if(Auth.Gender===""){
                        setMessage("Select Gender");
                    }
                    else{
                        if(Auth.Role===""){
                            setMessage("Select Role");
                        }
                        else{
                if(Auth.Age===""){
                    setMessage("Provide Age");

                }
                else{
                    registerUser(Auth.email,Auth.password);
                }

                        }
                    }                
              }
              else if(Auth.password!==Auth.Re_entered_password){
                setMessage("Password is not matched")
              }
              
            }
            else{
              setMessage("incorret email");
            }
          
        }
        else{
          setMessage("first name can't be null*");
          
        }
    
    
      
}
   }
   const toogle2=()=>{
    setRegister(true)
   }
    return (
        <div className={classes.sign}>
            <div className={classes.head}  >Sign Up</div>
            {Message.length!=0 && <Alert color="primary">
                {Message}
                </Alert>}

            <Form className={classes.form}>
                <FormGroup>
                    <Label for="Name">
                        Name
                    </Label>
                    <Input
                        id="Name"
                        name="Name"
                        placeholder="Name"
                        type="text"
                        onChange={(e)=>{setAuth({...Auth,Firstname:e.target.value})}}
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="Phone">
                        Phone

                    </Label>
                    <Input
                        id="Phone"
                        name="Phone"
                        placeholder="Phone"
                        type="tel"
                        onChange={(e)=>{setAuth({...Auth,PhoneNo:e.target.value})}}
                    
                    />
                </FormGroup>

                <FormGroup>
                    <Label for="exampleEmail">
                        Email
                    </Label>
                    <Input
                        id="exampleEmail"
                        name="email"
                        placeholder="with a placeholder"
                        type="email"
                        onChange={(e)=>setAuth({...Auth,email:e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="examplePassword">
                        Password
                    </Label>
                    <Input
                        id="examplePassword"
                        name="password"
                        placeholder="password placeholder"
                        type="password"
                        onChange={(e)=>setAuth({...Auth,password:e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="ConformPassword">
                        Re-Enter Password
                    </Label>
                    <Input
                        id="ConformPassword"
                        name="password"
                        placeholder="Passoword"
                        type="password"
                        onChange={(e)=>setAuth({...Auth,Re_entered_password:e.target.value})}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect">
                        Role
                    </Label>
                    <Input
                        id="exampleSelect"
                        name="select"
                        type="select"

                        onChange={(e)=>{setAuth({...Auth,Role:e.target.value})}}
                   >
                    <option value=''>
                            Select
                        </option>
                        <option value='Admin'>
                            Admin
                        </option>
                        <option value='Voter'>
                            Voter
                        </option>


                    </Input>
                </FormGroup>
                <FormGroup >
                    <Label for="exampleSelect1">
                        Gender
                    </Label>
                    <Input
                        id="exampleSelect1"
                        name="select"
                        type="select"
                        onChange={(e)=>setAuth({...Auth,Gender:e.target.value})}

                           >
                            <option value=''>
                            Select
                        </option>
                           <option value={'Male'}>
                            Male
                        </option>
                        <option value={'Female'}>
                        Female
                        </option>


                    </Input>

                </FormGroup>
                <FormGroup>
                    <Label for="exampleSelect2">
                        Age
                    </Label>
                    <Input
                        id="exampleSelect2"
                        name="select"
                        type="number"
                        onChange={(e)=>setAuth({...Auth,Age:e.target.value})}
/>


                </FormGroup>
                <div className={classes.button}>
                    <Button className={classes.buttoninside} 
                    onClick={submitForm}
                    >
                        Submit
                    </Button>
                </div>
            </Form>
            <p style={{color:"blue",cursor:"pointer"}} onClick={toogle2}>Already an user? Sign In</p>
        </div>
    )
}

export default Signup