import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { setSaveRecoder } from "../nodejs";

const firestore = getFirestore(app);
const storage = getStorage(app);
const fileReader = new FileReader();

export const setSaveData = async (data: string, record: Blob | undefined) => {
  const savePath = doc(
    firestore,
    "saveData",
    window.location.href.replaceAll("/", "_")
  );
  const timestamp = new Date();
  const storageRef = ref(storage, "/test");

  if (record != undefined) {
    const file = new File([record], "test");
    await uploadBytes(storageRef, file).catch((err) => console.log(err));
  }

  await setDoc(savePath, {
    data: data,
    timestampe: timestamp,
  });
};