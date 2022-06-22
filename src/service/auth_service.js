import { collection, addDoc, getDocs, setDoc, doc, Timestamp} from "firebase/firestore"; 
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
import {db} from "./firestore";

class AuthService{
  constructor(){
    this.auth = getAuth();
    this.googleProvider = new GoogleAuthProvider();
    this.githubProvider = new GithubAuthProvider();
  }

  login(providerName){
    const provider = this.getProvider(providerName);
    return signInWithPopup(this.auth, provider);
  }

  createUser(email, pw, nickname, birthDate, sex){
    createUserWithEmailAndPassword(this.auth, email, pw)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid); 
      // 자주쓰는거 context api로 관리
      // store data in Firestore
      try {
         setDoc(doc(db, "users", user.uid), {
          userEmail: email,
          userNickname: nickname,
          userBirthDate: Timestamp.fromDate(new Date(birthDate)),
          userSex: sex,  
          posts: [],
          comments: [],
          nestedComments: [],
        });

      } catch (e) {
        console.error("Error adding document: ", e);
      }
  
    });
  }

  
  emailLogin(email, pw){
    return signInWithEmailAndPassword(this.auth, email, pw);
  }

  getProvider(providerName){
    switch(providerName){
      case 'Google':
        return this.googleProvider;
      case 'Github':
        return this.githubProvider;
    }
  }

  //logout
  logout(){
    signOut(this.auth).then(() => {
      alert("logout성공");
      
    }).catch((error) => {
      alert("logout실패");
    });
  }
}

export default AuthService;