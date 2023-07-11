import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "./setting";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export const setSaveData = async (
  data: string,
  record: Blob | undefined,
  path: string
) => {
  const savePath = doc(
    firestore,
    "saveData",
    window.location.href.replaceAll("/", "_")
  );
  const timestamp = new Date();
  const storageRef = ref(storage, path);

  if (record !== undefined) {
    const file = new File([record], "test");
    await uploadBytes(storageRef, file).catch((err) => console.log(err));
  }

  await setDoc(savePath, {
    data: data,
    timestampe: timestamp,
  });
};
