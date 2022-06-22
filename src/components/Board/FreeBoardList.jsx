import React from 'react';
import styles from './FreeBoardList.module.css';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
import FreeBoardDetails from './FreeBoardDetails';

function FreeBoardList(props) {
  const navigate = useNavigate();

  const gotoFreeBoardDetails = () => {
    navigate(
      '/FreeBoardDetails',
      {state: props.post}
    )
  }

  const showDetails = () =>{
    gotoFreeBoardDetails();
  }

  return (
    <div>
      <ul className = {styles.post}>
        <li className={styles.article} id={props.post.title} onClick = {showDetails}>
          <h2 className={styles.title}>제목: {props.post.title}</h2>
          <h5>작성자: {props.post.user_nickname}</h5>
          <p className={styles.content}>내용: {props.post.content}</p>
        </li>
      </ul>
    </div>
  );
}

export default FreeBoardList;