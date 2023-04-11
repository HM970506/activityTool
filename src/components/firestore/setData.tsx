import app from "./setting";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export default function setData(url: string) {
  const storage = getStorage(app);
  const urlRef = ref(storage, url);
  const saveRef = ref(storage, "sideButtons/recode");

  const storageRef = ref(storage, "some-child");

  // uploadBytes(storageRef, file).then((snapshot) => {
  //   console.log('Uploaded a blob or file!');
  // });
}
