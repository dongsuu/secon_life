import React from 'react';
import styles from './Home.module.css';
import Login from './Login/Login';
import Navbar from'./Navbar';
function Home({authService}) {

  return (
    <div>
      <Navbar />
      < Login authService = {authService}/>
    </div>
  );
}

export default Home;