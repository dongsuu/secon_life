import React from 'react';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './Create.module.css';

//회원 가입 페이지
function Create({authService}) {
  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
  const [nickname,setNickname] = useState("");
  const [BirthDate, setBirthDate] = useState(new Date());
  const [sex,setSex] = useState("");
  const [isChecked, setIschecked] = useState(false);
  const navigate = useNavigate();
  
  const gotoHome = () =>{
    navigate({
      pathname: '/',
    });
  }

  const getEmail = (event) => {
    setEmail(event.target.value);
  }
  const getPw = (event) => {
    setPw(event.target.value);
  }
  const getNickname = (event) =>{
    setNickname(event.target.value);
  }
  const getBirthDate = (event) =>{
    setBirthDate(event.target.value);
  }
  const getSex = (event) =>{
    setSex(event.target.value);
  }

  // Authentication and Store data in the database
  const createUser = () =>{
    authService.createUser(email, pw, nickname,BirthDate,sex);
    gotoHome();
  }

  return (
    <div>
      <h1>회원 가입</h1>
      <div className={styles.create}>
      <label className={styles.label}> 아이디</label>
      <div className={styles.id}>
      <input className={styles.input}type="text" onChange={getEmail}></input>
      </div>

      <label className={styles.label}>비밀번호</label>
      <div className={styles.id}>
      <input className={styles.input}type="password" onChange={getPw}></input>
      </div>

      <label className={styles.label}>닉네임</label>
      <div className={styles.id}>
      <input className={styles.input}type="text" onChange={getNickname}></input>
      </div>

      <label className={styles.label}>생년월일</label>
      <div className={styles.id}>
      <input className={styles.input} type ="date" placeholder="ex.990830" onChange={getBirthDate}></input>
      </div>

      <label className={styles.label}>성별</label>
      <div className={styles.id}>
      <label className={styles.sex}>남<input className={styles.sex_input} type = "radio" name="sex" value="man" onClick={getSex}  ></input></label>
      <label className={styles.sex}>여<input className={styles.sex_input} type = "radio" name="sex" value = "woman" onClick={getSex} ></input></label>
      </div>
      <div className={styles.id}>
      <button className={styles.btn} onClick={createUser} >완료</button>
      <button className={styles.btn} onClick={gotoHome}>홈</button>
      </div>
      </div>
    </div>
  );
}

export default Create;