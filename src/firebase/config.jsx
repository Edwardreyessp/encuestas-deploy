import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getDatabase, ref as dataRef, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD0FKu0dmU_rm13CD_rOYXxI-rMEN8Eqc0",
  authDomain: "proyectoencuestas1-f2ece.firebaseapp.com",
  databaseURL: "https://proyectoencuestas1-f2ece-default-rtdb.firebaseio.com",
  projectId: "proyectoencuestas1-f2ece",
  storageBucket: "proyectoencuestas1-f2ece.appspot.com",
  messagingSenderId: "155763376702",
  appId: "1:155763376702:web:5f53f1454fffd944d7876f",
  measurementId: "G-HP6QXTS75S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const database = getDatabase(app);

export const uploadFile = async (file, fileName) => {
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

// export const getQuestions = () => {
//   const dbRef = dataRef(database);
//   get(child(dbRef, `questions`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log(snapshot.val());
//       } else {
//         console.log("No data available");
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
