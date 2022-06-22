import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { collection, query, getDocs } from "firebase/firestore";
import {db} from "../../service/firestore";
import styles from './FreeBoard.module.css';
import FreeBoardList from './FreeBoardList';

const FreeBoard = () => {
  const navigate = useNavigate();
  const [posts,setPosts]=useState([]);

  // Navigate 
  const gotoWrtieFreeBoard = () => {
    navigate({
      pathname:'/WriteFreeBoard',
    })
  }

  const gotoHome = () => {
    navigate({
      pathname:'/',
    })
  }


  const getFreeBoardArticle = async () => {
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);
    var newList = [];
    var copyObject = {}; // for add posts document id

    querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      copyObject = {...doc.data(), id: doc.id};
      newList.push(copyObject);
    });
    setPosts(newList);
  }

  useEffect(()=>{
    getFreeBoardArticle();
  },[]);

  return (
    <div>
      <h1>자유게시판</h1>
      <button onClick = {gotoWrtieFreeBoard}>글쓰기</button>
      <button onClick={gotoHome}>홈으로</button>
       <hr></hr>
      {posts.map((post) => <FreeBoardList post={post}/>)}
    </div>
  );
}

export default FreeBoard;