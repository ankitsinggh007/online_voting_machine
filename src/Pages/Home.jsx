import React, { useState, useContext, useEffect } from 'react'
import classes from "./Home.module.css";
import db from "../Firebase"
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import Male from "../Media/Male.png"
import Female from "../Media/Female.png"
import userData from '../Components/Store';
import DataBase from "../Firebase"
import { deleteDoc } from "firebase/firestore";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { InputLabel, FormControl, OutlinedInput, InputAdornment, Button } from '@mui/material';
function Home() {
  const { Auth, setAuth,FetchData, setMessage, Candidate, setCandidate, CreatePoll, Notify, setNotify } = useContext(userData);
  const [IsLive, setIsLive] = useState(false);
  const [Enabled, setEnabled] = useState(false);
  const wi=[];
  const [Winner,setWinner]=useState("");
  const [Memeber, setMemeber] = useState({
    name1: "",
    name2: "",
    name3: "",
    name4: ""
  })
  const array = [];
  useEffect(() => {
    const FetchData1 = async () => {

      const citiesRef = collection(DataBase, "Contest");
      const q = query(citiesRef, where("IsContestLive", "==", true));
      console.log(q, "q");
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot, "querySnapshot")
      if (querySnapshot.docs.length !== 0) setIsLive(true);
      else setIsLive(false);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const candy = [
          {
            id: 1,
            name: doc.data().Candidate[0].name,
            Votes: doc.data().Candidate[0].Votes,
            color: "linear-gradient(0deg, rgba(2,176,78,1) 13%, rgba(2,176,78,1) 68%)"

          },
          {
            id: 2,
            name: doc.data().Candidate[1].name,
            Votes: doc.data().Candidate[1].Votes,
            color: "linear-gradient(0deg, rgba(28,128,187,1) 30%, rgba(2,52,176,1) 98%)"

          },
          {
            id: 3,
            name: doc.data().Candidate[2].name,
            Votes: doc.data().Candidate[2].Votes,
            color: "linear-gradient(0deg, rgba(132,12,191,1) 30%, rgba(209,23,195,1) 72%)"

          },
          {
            id: 4,
            name: doc.data().Candidate[3].name,
            Votes: doc.data().Candidate[3].Votes,
            color: "linear-gradient(0deg, rgba(191,12,43,1) 30%, rgba(170,29,16,1) 72%)"

          }, {
            IsContestLive: doc.data().IsContestLive,
            id: doc.id
          }

        ]
        setCandidate([...candy]);
      });
    }
    FetchData1();
  }, [IsLive, Enabled]);



  const Submit = (e) => {
    e.preventDefault();
    Candidate[0].name = Memeber.name1;
    Candidate[1].name = Memeber.name2;
    Candidate[2].name = Memeber.name3;
    Candidate[3].name = Memeber.name4;
    if (Candidate[0].name !== "" && Candidate[1].name !== "" && Candidate[2].name !== "", Candidate[3].name !== "") {
      console.log("inside")
      CreatePoll();
    }
    console.log(Candidate, "Candidate")
    setEnabled(true)
  }

  const Array = Candidate.slice(0, 4);
  const Vote = async (e) => {
    if (Auth.isAuthrized) {
      if (Auth.isVoted == "No") {
        const id = e.target.id;
        const a = [
          ...Candidate, Candidate[id - 1].Votes.push(1)
        ]
        console.log(Auth,"Auth")
        setAuth({ ...Auth, isVoted: "Yes" });

        const obj = {email: Auth.email,Firstname: Auth.Firstname,PhoneNo: Auth.PhoneNo,Role: Auth.Role,Gender: Auth.Gender,Age:Auth.Age,isVoted: "Yes" };
        const array = a.slice(0, 5);
        setCandidate([...array])

        const washingtonRef = doc(db, "Contest", Candidate[4].id);

        await updateDoc(washingtonRef, {
          Candidate: Candidate,
        });
        const ref = doc(db, "User", Auth.id);
        console.log(obj, "iam going in")
        await updateDoc(ref, {
          ...obj
        });

      }
      else {
        setNotify("you alraedy Voted")
      }

    }
    else {
      setNotify("You are Not Logged In");
    }
  }
  console.log(Candidate)
  // delete contest
  const DeleteContest = async () => {
    await deleteDoc(doc(db, "Contest", Candidate[4].id));
    setIsLive(false);
    // 
    setEnabled(false);
    setCandidate([
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
        ])
    const citiesRef = collection(DataBase, "User");
    const q = query(citiesRef, where("isVoted", "==", "Yes"));
    console.log(q, "q");

    const querySnapshot = await getDocs(q);
    console.log(querySnapshot, "querySnapshot");
    const update = async (docker) => {
      console.log(docker.id, " => ", docker.data());
      const ref = doc(db, "User", docker.id);
      const array = {
        ...docker.data(), isVoted: "No",
      }
      console.log(array)
      await updateDoc(ref, {
        ...array
      });
    }
    querySnapshot.forEach((docker) => {
      update(docker);
    });
    FetchData(Auth.email);
    setWinner("");
    wi="";
   
    
  }
  const CalculateWinner=()=>{
    let temp=wi[0];
    console.log(wi)
    if(!(wi[0].Vote==0&&wi[1].Vote==0&&wi[2].Vote==0&&wi[3]==0)){

    for(let i=1;i<wi.length;i++){
      if(temp.Vote>wi[i].Vote){
        continue;
      }
      else{
        temp=wi[i]
      }
    } 
  }
  else{
      temp={
        name:"___"
      }    
  }
  setWinner(temp)   

  }
  console.log(Auth.Gender)
  let p;
  if(Auth.Gender==="Male"){
    p=Male;
  }
  else{
    p=Female;
  }
  return (
    <div className={classes.main}>
      <div className={classes.Bio}>
        
        <div className={classes.image}>
          <img src={p} height="100px" width="100px" />
        </div>
        <div>
          <span className={classes.attribute}>Name</span>:<span className={classes.Value}>{Auth.Firstname}</span>
        </div>
        <div>
          <span className={classes.attribute}>Age</span>:<span className={classes.Value}>{Auth.Age}</span>
        </div>
        <div>
          <span className={classes.attribute}>Gender</span>:<span className={classes.Value}>{Auth.Gender}</span>
        </div>
        <div>
          <span className={classes.attribute}>Phone</span>:<span className={classes.Value}>{Auth.PhoneNo}</span>
        </div>
        <div>
          <span className={classes.attribute}>Email</span>:<span className={classes.Value}>{Auth.email}</span>
        </div>
        <div>

          <span className={classes.attribute}>Role</span>:<span className={classes.Value}>{Auth.Role}</span>
        </div>
        <div>

          <span className={classes.attribute}>Voted</span>:<span className={classes.Value}>{Auth.isVoted}</span>
        </div>
      </div>
      <div className={classes.Contest}>
        {
          !IsLive && Auth.Role === "Admin" && <form onSubmit={Submit} className={classes.form}>
            <div className={classes.heading}>Form</div>

            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount" required>Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">1st Candidate:-</InputAdornment>}
                label="Amount"
                onChange={(e) => { setMemeber({ ...Memeber, name1: e.target.value }) }}

              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount" required>Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start" required>2nd Candidate:-</InputAdornment>}
                label="Amount"
                onChange={(e) => { setMemeber({ ...Memeber, name2: e.target.value }) }}
              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount" required>Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start" required>3rd Candidate:-</InputAdornment>}
                label="Amount"
                onChange={(e) => { setMemeber({ ...Memeber, name3: e.target.value }) }}


              />
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount" required>Name</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">4th Candidate:-</InputAdornment>}
                label="Amount"
                onChange={(e) => { setMemeber({ ...Memeber, name4: e.target.value }) }}

              />
            </FormControl>
            <div style={{ alignSelf: "center" }}>
              <Button variant="contained" type="submit" disabled={Enabled} style={{ backgroundColor: "#96E080" }}>Create</Button>
            </div>
            <div className={classes.note}>* the contest should having minimum 2 candidate</div>
          </form>
        }
        {
          !IsLive && Auth.Role !== "Admin" && <div className={classes.nodata}>






            <p className={classes.data}>Currently No Contest is Going On</p>









          </div>
        }
        {
          IsLive &&
          <div className={classes.aside}>
            <div className={classes.Poll}>

              {
                Array.map((obj, index) => {
                  console.log(obj.Votes.length)
                  const height = obj.Votes.length * 5;
                  wi.push({name:obj.name,Vote:obj.Votes.length})
                return (
                    <div className={classes.Candidate} id={obj.id} key={obj.id} onClick={Vote}>
                      <div className={classes.fill} style={{ height: `${height}%`, width: "100%", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", background: `${obj.color}` }}></div>
                      <span className={classes.name}>{obj.name}</span>
                    </div>
                  )
                })
              }


            </div>
            {
              Auth.Role === "Admin" &&
            <>
              <Button onClick={CalculateWinner} className={classes.CalculateWinner2} color="success" variant="contained">calculate Result</Button>
              <h1 className={classes.CalculateWinner2}  >{Winner.name}</h1>

              <Button onClick={DeleteContest} className={classes.create} color="success" variant="contained">Complete Current Poll</Button>
              

</>

            }

          </div>

        }
      </div>
    </div>
  )
}

export default Home