import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref } from "firebase/storage";
import { ProjectData } from "./types";
import { firebaseConfig } from "./firebase_config";

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const storage = getStorage();

/**
 * Retrieves the download URL of an image from Firebase storage.
 */
export async function getImgURL() {
  const imgRef = ref(storage, "<URL>");
  const imgURl = await getDownloadURL(imgRef);
  console.log(`Download URL: ${imgURl}`);
}

/**
 * Uploads project data to Firebase Firestore.
 * @param data The project data to be uploaded.
 */
export async function uploadProject(data: ProjectData) {
  try {
    const docRef = doc(collection(db, "test"));
    await setDoc(docRef, data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

// getImgURL();
// uploadProject(projectData);
