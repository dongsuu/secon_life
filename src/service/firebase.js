import { initializeApp } from 'firebase/app';
import {firebaseConfig} from "./firebaseConfig";

//initialize firebase
export const app = initializeApp(firebaseConfig);
