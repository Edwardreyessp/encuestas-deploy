import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getDatabase, ref as dataRef, child, get } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiD59Pcm0fZdhZNksigMRTnUEnWtpe78A",
  authDomain: "encuestas-d19ab.firebaseapp.com",
  projectId: "encuestas-d19ab",
  storageBucket: "encuestas-d19ab.appspot.com",
  messagingSenderId: "259304377291",
  appId: "1:259304377291:web:16743679fbbc444628444e",
  measurementId: "G-QF4N3G68HP",
  databaseURL: "https://encuestas-d19ab-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const database = getDatabase(app);

export const uploadFile = async (file, fileName) => {
  const storageRef = ref(storage, fileName);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const getQuestions = () => {
  const dbRef = dataRef(database);
  get(child(dbRef, `questions`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
