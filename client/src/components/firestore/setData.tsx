import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage, ref, uploadBytes } from "firebase/storage";

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

  if (record == null) {
    await setDoc(savePath, {
      data: data,
      timestampe: timestamp,
      record: null,
    });
  } else {
    const url = await fetch(record);
    const blob = await url.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const array = Array.from(uint8Array);

    console.log("record", record);
    console.log("url", url);
    console.log("blob", blob);
    console.log("arraybuffer", arrayBuffer);
    console.log("unit8Array", uint8Array);

    await setDoc(savePath, {
      data: data,
      timestampe: timestamp,
      record: array,
    });
  }
};
