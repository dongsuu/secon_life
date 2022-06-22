import React from 'react';
import styles from './Navbar.module.css';
import {useNavigate} from 'react-router-dom';

function Navbar() {

//goto FreeBoard
const navigate = useNavigate();
const gotoFreeBoard = () =>{
  navigate({
    pathname: '/FreeBoard',
  });
}

const gotoStudyBoard = () =>{
  navigate({
    pathname: '/StudyBoard',
  });
}
  return (
    <div>
      <div className={styles.navBar} >
      <img className={styles.logo}src="../../images/team.png"></img>
      <div className={styles.m}>
      <ul className={styles.menu} >
        <li className={styles.menu1}>
          공지사항
          <div className={styles.notice}>
            <ul>
              <li className={styles.noticelist}>공지1</li>
              <li className={styles.noticelist}>공지2</li>
            </ul>
          </div>
        </li>
        <li className={styles.menu2}>
          게시판
          <div className={styles.board}>
            <ul>
              <li className={styles.boardlist} onClick ={gotoFreeBoard}>자유게시판</li>
              <li className={styles.boardlist} onClick={gotoStudyBoard}>스터디게시판</li>
              <li className={styles.boardlist}>취미게시판</li>
            </ul>
          </div>
        </li>
        <li>
          
        </li>
      </ul>
      </div>
      <div className={styles.search}>
      <input className={styles.text}type="search" placeholder = "검색"></input>
      <button className={styles.btn}>검색</button>
      </div>
      </div>
    </div>
  );
}

export default Navbar;