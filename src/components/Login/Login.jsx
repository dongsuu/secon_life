import React from 'react';
import styles from './Login.module.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';

function Login({authService}) {
  const navigate = useNavigate();
  const [email,setEmail] = useState("");
  const [pw,setPw] = useState("");
  const [loginComplete, setLoginComplete] = useState(false);
  const [usr, setUser] = useState({});

  // goto Home when success Login 
  const gotoLhome = (user) =>{
    const email = user.email;
    navigate('/Lhome', {state: {id: email,}, //user 객체 전달
  });
}

  // goto 회원가입 page 
  const gotoCreate = () =>{
    navigate({
      pathname: '/Create',
    });
  }

  // onLogin function for github, google login.
  const onLogin = (event) =>{
    authService.login(event.target.value)
    .then((data) => gotoLhome(data.user.uid))
    .catch((error) => {
      alert("로그인 실패!");
    });
  }

  // onEmail function for e-mail login.
  const onEmail = () =>{
    setLoginComplete(false);
    const login = authService.emailLogin(email, pw);
    login.then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setLoginComplete(true);
      setUser(user);
      gotoLhome(user);
    })
    .catch((error)=> {
      console.log(error.code);
      if(error.code === "auth/invalid-email")
        alert("로그인 실패!! 이메일이 잘못 입력되었습니다.");
      else if(error.code === "auth/wrong-password")
        alert("로그인 실패!! 비밀번호가 잘못 입력되었습니다.");
      else
        alert("로그인 실패!! 사용자가 존재하지 않습니다.");
    });
  }

  // get User input email, password 
  const getEmail = (event)=>{
    setEmail(event.target.value);
  }
  const getPw = (event) =>{
    setPw(event.target.value);
  }
  

  return (
    <div>
      <section className={styles.login}>
        <h1>로그인</h1>
        <input className={styles.id} onChange={getEmail}type="text" placeholder ="아이디를 입력하세요"></input>
        <input className={styles.pw} onChange={getPw}type="password" placeholder ="비밀번호를 입력하세요"></input>
        <button className={styles.btn} onClick={onEmail}>로그인</button>
        {!loginComplete ? "로그인 하지 않았습니다." : ""}
        <ul className={styles.list}>
          <li className={styles.item}>
            <button onClick={onLogin} value="Google">Google</button>
          </li>
          <li className={styles.item}>
            <button onClick={onLogin} value="Github">Github</button>
          </li>
          <li><button onClick={gotoCreate}>회원가입</button></li>
        </ul>

      </section>
    </div>
  );
}

export default Login;