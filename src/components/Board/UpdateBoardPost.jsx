import React from 'react';
import {useLocation} from 'react-router-dom';
import styles from './UpdateBoardPost.module.css';
import {useState,useEffect, useRef} from 'react';
import { doc, setDoc } from "firebase/firestore";
import {db} from "../../service/firestore";
import { Timestamp } from "firebase/firestore"; 
import {useNavigate} from 'react-router-dom';


function UpdateBoardPost() {
  const [updatedtitle, setUpdatedtitle] = useState("");
  const [updatedcontent, setUpdatedcontent] = useState("");
  const [updatedcategory, setUpdatedcategory] = useState("");

  const navigate = useNavigate();
  const {state} = useLocation();

  const inputRefTitle = useRef(null);
  const inputRefContent = useRef(null);
  const inputRefCategory = useRef(0);

  // Navigate
  const gotoFreeBoard = () => {
    navigate(
      '/FreeBoard',
    )
  }

  const gotoStudyBoard = () => {
    navigate(
      '/StudyBoard',
    )
  }
  
  // Get previous title and content in input tag. 
  const initialize = () => {
    inputRefTitle.current.value = state.title;
    inputRefContent.current.value = state.content;
    inputRefCategory.current.value = state.category;
    setUpdatedtitle(state.title);
    setUpdatedcontent(state.content);
    setUpdatedcategory(state.category);
  }

  // Get updated title and content 
  const getUpdatedTitle = (event) =>{
    setUpdatedtitle(event.target.value);
  }
  const getUpdatedContent = (event) =>{
    setUpdatedcontent(event.target.value);
  }
  const getUpdatedCategory = (event) => {
    setUpdatedcategory(parseInt(event.target.value));
  }

  // When user press the update complete button. 
  const updateComplete = async (event) =>{
    event.preventDefault();
    await setDoc(doc(db, "posts", state.id), {
      authorID: state.authorID, //string  same
      genTime: Timestamp.fromDate(new Date()), //date type update
      title: updatedtitle, // update
      content: updatedcontent, // update 
      user_nickname: state.user_nickname, //same
      category: updatedcategory,
    });
    if(updatedcategory == 1){
      gotoFreeBoard();
    }
    else if(updatedcategory == 2){
      gotoStudyBoard();
    }
  }

  useEffect(()=>{
    initialize();
  },[])

  return (
    <div>
      <form>
        <div>
          {state.category == 1 ? 
          <h1 className={styles.freeboard_text}>자유게시판 - 글수정하기</h1>
          :
          <h1 className={styles.freeboard_text}>스터디게시판 - 글수정하기</h1>
          } <hr />
          <label className={styles.title_label}>제목</label>
          <input ref = {inputRefTitle} className={styles.title_input} type="text" onChange={getUpdatedTitle}></input>
          <label className={styles.title_label}>카테고리</label>
          <select ref = {inputRefCategory} onChange={getUpdatedCategory}>
            <option value="1">자유 게시판</option>
            <option value="2">스터디 게시판</option>
          </select>
        </div>

          <div>
          <label className={styles.content_label}>내용</label>
          <textarea ref = {inputRefContent} className={styles.content_input} onChange={getUpdatedContent}></textarea>
          </div>
          <button onClick = {updateComplete} className={styles.complete_btn}> 수정완료 </button>
      </form>
    </div>
  );
}

export default UpdateBoardPost;