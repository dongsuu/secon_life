import React from 'react';
import Navbar from './Navbar';
import { useNavigate} from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react';
import { getDoc,doc } from "firebase/firestore"; 
import { db } from "../service/firestore";

const Lhome = ({authService}) =>  {
  const navigate = useNavigate();
  const auth = getAuth();

  const [uid, setUid] = useState("");
  const [usernickname, setUsernickname] = useState("");
  const [postcount, setPostcount] = useState(0);

  // logout
  const logOut = () =>{
    authService.logout();
    navigate({
      pathname: '/',
    })
  }

  useEffect(()=>{
    // Check Login state 
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUid(uid);
        const docRef = doc(db,"users",uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPostcount(docSnap.data().posts.length);
          // console.log("Document data:", docSnap.data().userNickname);
          setUsernickname(docSnap.data().userNickname);
        } 
        else {
           // doc.data() will be undefined in this case
            console.log("No such document!");
          }
          // ...
      } 
      else {
          // User is signed out
          // ...
      }});

      //Check my Post count
      
  },[]);

  return (
    <div>
      <Navbar uid={uid}/>
      <h1>Welcome {usernickname}</h1>
      <h3>내 게시글 수: {postcount}</h3>
      <button onClick={logOut}>로그아웃</button>
    </div>
  );
}

export default Lhome;