import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref as dataRef, set } from "firebase/database";

const firebaseConfig = {
  apiKey: 'AIzaSyD0FKu0dmU_rm13CD_rOYXxI-rMEN8Eqc0',
  authDomain: 'proyectoencuestas1-f2ece.firebaseapp.com',
  databaseURL: 'https://proyectoencuestas1-f2ece-default-rtdb.firebaseio.com',
  projectId: 'proyectoencuestas1-f2ece',
  storageBucket: 'proyectoencuestas1-f2ece.appspot.com',
  messagingSenderId: '155763376702',
  appId: '1:155763376702:web:5f53f1454fffd944d7876f',
  measurementId: 'G-HP6QXTS75S',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app);

export const uploadFile = async (file, fileName) => {
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const createUserWithEmail = async (email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

export const postRealtime = async (data, path) => {
  try {
    await set(dataRef(database, path), data);
  } catch (error) {
    console.log(error);
  }
}
