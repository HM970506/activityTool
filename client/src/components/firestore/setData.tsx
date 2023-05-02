import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { setSaveRecoder } from "../api/nodejs";

const firestore = getFirestore(app);
const storage = getStorage(app);
const fileReader = new FileReader();

export const setSaveData = async (data: string, record: string | null) => {
  const savePath = doc(
    firestore,
    "saveData",
    window.location.href.replaceAll("/", "_")
  );
  const timestamp = new Date();

  if (record != null) {
    const url = await fetch(record);
    const blob = await url.blob();
    await setSaveRecoder(blob);
  }

  await setDoc(savePath, {
    data: data,
    timestampe: timestamp,
  });
};
