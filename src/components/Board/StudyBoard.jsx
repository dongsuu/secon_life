import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { collection, query, getDocs, where } from "firebase/firestore";
import {db} from "../../service/firestore";
import BoardList from './BoardList';
import Lhome from '../Login/Lhome';
function StudyBoard(props) {
  const navigate = useNavigate();
  const [posts,setPosts] = useState([]);

  const gotoWriteStudyBoard = () => {
    navigate({
      pathname:'/WriteStudyBoard',
    })
  }
  const gotoLhome = () => {
    navigate({
      pathname:'/Lhome',
    })
  }

  const getStudyBoardArticle = async () => {
    const q = query(collection(db, "posts"), where("category", "==", 2));
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
    getStudyBoardArticle();
  },[]);

  return (
    <div>
      <h1>스터디 게시판</h1>
      <button onClick= {gotoWriteStudyBoard} >글쓰기</button>
      <button onClick = {gotoLhome}>홈으로</button>
      {posts.map((post) => <BoardList post = {post}/>)}
    </div>
  );
}

export default StudyBoard;