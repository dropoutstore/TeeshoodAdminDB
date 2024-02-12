/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Function to convert DataURL to Blob
export function dataURLtoBlob(dataurl: string): Blob {
    const arr = dataurl.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
}

// Function to upload image to Firebase Storage and get the download URL
export async function uploadImageToFirebase(dataUrl: string, filePath: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, filePath);
    const blob = dataURLtoBlob(dataUrl);

    try {
        const snapshot = await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}