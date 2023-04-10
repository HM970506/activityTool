import app from "./setting";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

export default async function getData() {
  // const db = getFirestore(app);
  // const q = query(collection(db, "test"));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });

  const storage = getStorage(app);
  const openEyeRef = ref(storage, "topButtons/viewButton/openEye.svg");
  getDownloadURL(openEyeRef)
    .then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = "blob";
      xhr.onload = (event) => {
        const blob = xhr.response;
        console.log(blob);
      };
      xhr.open("GET", url);
      xhr.send();

      const img = document.getElementById("myimg");
      img?.setAttribute("src", url);
    })
    .catch((error) => {
      console.log("err: ", error);
    });
}
