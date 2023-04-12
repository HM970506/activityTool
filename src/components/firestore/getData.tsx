import axios from "axios";
import app from "./setting";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  StorageReference,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";

const firestore = getFirestore(app);
const storage = getStorage(app);

export async function getFirestoreData(href: string) {
  const docRef = doc(firestore, "saveData", href);
  const docSnap = await getDoc(docRef).catch((error) => {
    console.log("firestore Error: ", error);
    return null;
  });

  return docSnap == null ? null : docSnap.data();
}

export async function getStorageData(path: string) {
  const pathRef = ref(storage, path);
  const data = await getDownloadURL(pathRef).catch((error) => {
    console.log("storage Error: ", error);
    return null;
  });

  return data;
}

export async function getStorageDataAll(path: string) {
  const pathRef = ref(storage, path);
  const imageList = await listAll(pathRef).catch((error) => {
    console.log("storage allList Error: ", error);
    return null;
  });

  if (imageList == null) return;

  const data = new Array();

  for (const item of imageList.items) {
    const now = await getDownloadURL(ref(storage, item.fullPath)).catch(
      (error) => {
        console.log("storage allList get Error: ", error);
      }
    );
    data.push(now);
  }

  return data;
}
