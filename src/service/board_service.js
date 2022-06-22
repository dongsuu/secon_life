import {db} from "./firestore";
import { collection, addDoc, getDoc, setDoc, doc, Timestamp, updateDoc, arrayUnion, arrayRemove} from "firebase/firestore"; 

class BoardService{

  async storeArticle(title, content, uid, unickname, category){
    console.log(unickname);
    const userDocRef = doc(db,"users",uid);
   // const docRef = doc(db, "users",uid);
   // const docSnap = getDoc(docRef);

   // if(docSnap.exists())
    //  console.log("Document data: ")
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        authorID: uid, //string
        genTime: Timestamp.fromDate(new Date()), //date type
        title: title, //string
        content: content, //string
        user_nickname: unickname, 
        category: category,
      });
      console.log(docRef.id);
      updateDoc(userDocRef,{
        posts: arrayUnion(docRef.id),
      });
    } 
    catch (e) {
      console.error("Error adding document: ", e);
    }

  }
  
}

export default BoardService;