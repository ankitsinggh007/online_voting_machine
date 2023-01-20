import React, { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Footer from "./Components/Footer";
import NavbarComponenet from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import userData from "./Components/Store";
import { app } from "./Firebase";
import DataBase from "./Firebase"
import "./App.css"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Home from "./Pages/Home";
const auth = getAuth();

function App() {
  const [Auth, setAuth] = useState({
    Firstname: "",
    PhoneNo: "",
    email: "",
    Gender: '',
    password: "",
    Role: "",
    IsLogin: false,
    isAuthrized: false,
    isVoted: "No",
    Age:"",
  });
  const [Message, setMessage] = useState("")
  const [Candidate, setCandidate] = useState([
{      
  id:1,
  name: "",
  Votes: []
},   
{   
id:2,
name: "",
Votes: []}
, {
id:3,
name: "",
Votes: []
},      
{
id:4,
name: "",
Votes: []
},
{
  IsContestLive:false,
    id:""
}
  ]
);
    const [Register, setRegister] = useState(true)
  const [Notify, setNotify] = useState("")
  // Create Poll
  const CreatePoll = async (del) => {

    console.log(Candidate, "Candidate")
    const DocRef = await addDoc(collection(DataBase, "Contest"), {
      Candidate,IsContestLive:true
    });
  }
  // Create user in db
  const CreateUserInDataBase = async () => {

    console.log(Auth, "Auth")
    const DocRef = await addDoc(collection(DataBase, "User"), {
      email: Auth.email,
      Firstname: Auth.Firstname,
      PhoneNo: Auth.PhoneNo,
      Role: Auth.Role,
      Gender: Auth.Gender,
      isVoted: "No",
      Age:Auth.Age,

    });
    setAuth({ ...Auth, IsLogin: true });
  }
  const FetchData = async (email) => {
    console.log(email, "email")
    const citiesRef = collection(DataBase, "User");
    const q = query(citiesRef, where("email", "==", `${email}`));
    console.log(q, "q");
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "querySnapshot")
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setAuth({ ...Auth, ...doc.data(), id: doc.id,IsLogin:true,isAuthrized:true, });
    });
  }



  const registerUser = (email, password) => {
    const data = createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log("i am in Succesfful");
        setMessage("Acount created!");
        CreateUserInDataBase();
        setTimeout(() => {
          setMessage("");


        }, 3000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // setMessage(error)
        console.log("i am in error")
      });
  }
  //Login
  const loginUser = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user, "loged in");
        setMessage("Logged In")
        FetchData(user.email);
        
            // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Can't loged in");
        setMessage(errorMessage.split("/")[1]);

      });
  }
      console.log(Auth,"Auth")
      console.log(Candidate,"Candidate")

  return (
    <userData.Provider value={{ Auth,Register,setRegister, setAuth,Notify,setNotify,registerUser, setMessage,CreatePoll, Message,FetchData, loginUser, Candidate, setCandidate }} >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "130vh" }}>
        <NavbarComponenet />
        {!Auth.isAuthrized &&   <LandingPage  />}
        {Auth.isAuthrized && <Home />}
        <Footer />
      </div>
    </userData.Provider>
  );
}

export default App;
