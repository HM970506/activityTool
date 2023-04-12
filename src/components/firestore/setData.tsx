import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export const setAudioData = (url: string) => {
  const storage = getStorage(app);
  const urlRef = ref(storage, url);
  const saveRef = ref(storage, "sideButtons/recode");

  const storageRef = ref(storage, "some-child");

  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
};

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
