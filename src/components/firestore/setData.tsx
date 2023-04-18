import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export const setSaveDate = async (data: string, record: string | undefined) => {
  const savePath = doc(
    firestore,
    "saveData",
    window.location.href.replaceAll("/", "_")
  );
  const timestamp = new Date();
  await setDoc(savePath, {
    data: data,
    timestampe: timestamp,
    record: record == undefined ? null : record,
  });
};

export const setAudioDate = async (record: string) => {
  console.log(record);
  const sound = new File([new Blob([record])], "soundBlob", {
    lastModified: new Date().getTime(),
    type: "audio/mpeg",
  });
  const storageRef = ref(
    storage,
    `bottomTools/record/${window.location.href.replaceAll("/", "_")}`
  );

  await uploadBytes(storageRef, sound).catch((error) => {
    console.log("Audio Save Error: ", error);
    return null;
  });
};
