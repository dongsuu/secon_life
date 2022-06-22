import React from 'react';
import {useState, useEffect} from 'react';
import { getAuth } from "firebase/auth";
import styles from './WrtieFreeBoard.module.css';
import {useNavigate} from 'react-router-dom';
import { getDoc, doc} from "firebase/firestore"; 
import {db} from "../../service/firestore";

const WriteFreeBoard = ({boardService}) => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userid, setUserid] = useState("");
  const [usernickname, setUsernickname] = useState("");

  const auth = getAuth();

  const navigate = useNavigate();
  const gotoFreeBoard = () => {
    navigate({
      pathname:'/FreeBoard',
    })
  }

  const checkUser = () => { // 로그인 되어있는지 check.
    const user = auth.currentUser; // 현재 로그인한 user 가져오기
    if (user) {
      setUserid(user.uid);
    } else {
      alert("로그인 해주세요 !!");
      gotoFreeBoard();
      // No user is signed in.
    }
  }

  const getNickname = async () =>{
    const docRef = doc(db, "users", userid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      try{
        setUsernickname(docSnap.data().userNickname);
      } catch (e){
        console.log("Error getting cached document:", e);
      }
    }
  }

  useEffect(()=>{
    checkUser();
  },[]);
  
  useEffect(()=>{
   getNickname(); // userId가 정상적으로 setState된 후에, Nickname 접근해야함! 
  },[userid]);

  // When user press the complete button 
  const completeWrite = async (event) => {
      event.preventDefault();
      await boardService.storeArticle(title,content,userid,usernickname); // Store post in DB
      gotoFreeBoard();
  }

  // Get user input.
  const getTitle = (event) =>{
    setTitle(event.target.value);
  }

  const getContent = (event) => {
    setContent(event.target.value);
  }

    return (
      <div>
        <form>
          <div>
          <h1 className={styles.freeboard_text}>자유게시판 - 글쓰기</h1> <hr />
          <label className={styles.title_label}>제목</label>
          <input className={styles.title_input}type="text" onChange={getTitle} placeholder = "제목을 입력해 주세요."></input>
          </div>

          <div>
          <label className={styles.content_label}>내용</label>
          <textarea className={styles.content_input}onChange={getContent} placeholder = "내용을 입력해 주세요."></textarea>
          </div>
          <button className={styles.complete_btn}onClick = {completeWrite}>완료</button>
        </form>
      </div>
    )
}

export default WriteFreeBoard;