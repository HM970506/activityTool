import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export const setSaveDate = async (data: string, record: null | string) => {
  const savePath = doc(
    firestore,
    "saveData",
    window.location.href.replaceAll("/", "_")
  );
  const timestamp = new Date();
  await setDoc(savePath, {
    data: data,
    timestampe: timestamp,
    record: record,
  });
};
