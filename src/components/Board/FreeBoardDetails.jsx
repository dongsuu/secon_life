import React from 'react';
import {useLocation} from 'react-router-dom'
import { getAuth } from "firebase/auth";
import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { doc, deleteDoc } from "firebase/firestore";
import {db} from "../../service/firestore";


function FreeBoardDetails() {
  const {state} = useLocation();
  const [isMine, setIsmine] = useState(false); 
  const navigate = useNavigate();

  // Navigate
  const gotoUpdatePost = () => {
    navigate(
      '/UpdateFreeBoardPost',
      {state: state},
    )
  }
  const gotoFreeBoard = () => {
    navigate(
      '/FreeBoard',
      {state: state},
    )
  }

  // 로그인 되어있는지 check.
  const checkUser = () => {
    const auth = getAuth();
    const user = auth.currentUser; // 현재 로그인한 user 가져오기
    if(user !== null){
      if (user.uid == state.authorID) { // 나의 게시물에만 update, delete 접근. use State isMine
        setIsmine(true); 
      }
    }
    else {
      alert("로그인 해주세요! ");
      setIsmine(false);
      gotoFreeBoard();
      // No user is signed in.
    }
  }

  // Delete
  const deletePost = async () =>{
    await deleteDoc(doc(db, "posts", state.id));
    gotoFreeBoard();
  }

  useEffect(()=>{
    checkUser();
  },[]);

  return (
    <div>
      <h1>제목: {state.title}</h1>
      <p>내용: {state.content}</p>
      {isMine ? 
      <div>
        <button onClick = {gotoUpdatePost}>수정</button>
        <button onClick = {deletePost}>삭제</button>
      </div>: ""}
    </div>
  );
}

export default FreeBoardDetails;