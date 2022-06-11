import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { randomBytes } from 'crypto';
import { storage } from '../firebase/firebase';

function getRandomFileName(){
  return randomBytes(16).toString('hex');
}

export async function uploadFile(file, filePath){
  try{
    const storageRef = ref(storage, filePath);
    const uploadRes = await uploadBytes(storageRef, file);
    console.log(uploadRes);
  }catch(err) {
    throw new Error(err.message);
  }
}

