import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-config";

export async function uploadFile(file) {
  const fileRef = ref(storage, file.name);
  const uploadTask = uploadBytesResumable(fileRef, file);
  let url = '';
  uploadTask.on('state_changed',
    (snapshot) => {},
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        url = downloadURL;
      });
    }
  );
  return url;
}