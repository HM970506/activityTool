import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export const setSaveDate = async (data: string) => {
  const savePath = doc(
    firestore,
    "saveData",
    window.location.href.replaceAll("/", "_")
  );
  const timestamp = new Date();
  await setDoc(savePath, {
    data: data,
    timestampe: timestamp,
  });
};

export const setAudioDate = async (record: Blob) => {
  const sound = new File([record], "soundBlob", {
    lastModified: new Date().getTime(),
    type: "audio/mpeg",
  });

  //파일 변환에 문제가 있는 것 같은데... 재생이 안 돼잇
  const blob = new Blob([record], { type: "audio/mpeg" });

  console.log(blob);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `test`;
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);

  const storageRef = ref(
    storage,
    `bottomTools/record/${window.location.href.replaceAll("/", "_")}`
  );

  await uploadBytes(storageRef, sound).catch((error) => {
    console.log("Audio Save Error: ", error);
    return null;
  });
};
