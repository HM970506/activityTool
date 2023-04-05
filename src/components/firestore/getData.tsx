import app from "./setting";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";

export default async function getData() {
  // const db = getFirestore(app);
  // const q = query(collection(db, "test"));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  // });
}
