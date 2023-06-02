import { collection, query, getDocs, addDoc } from "firebase/firestore/lite";
import { db } from "../firebase-config";

export async function getDocList(collectionName) {
  const q = query(collection(db, collectionName));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data()
    });
  });
  return data;
}

export async function createDoc(collectionName, data) {
  return await addDoc(collection(db, collectionName), data);
}