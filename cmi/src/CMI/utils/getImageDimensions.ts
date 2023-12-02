// export async function getImageDimensionsFromFile(fileInput:File):Promise<{width:number, height:number}> {
//     return new Promise((resolve, reject) => {
  
//       if (!fileInput.type.match('image.*')) {
//         reject(new Error('The selected file is not an image.'));
//         return;
//       }
  
//       const reader = new FileReader();
  
//       reader.onload = (e) => {
//         const img = new Image();
  
//         img.onload = () => {
//           resolve({ width: img.width, height: img.height });
//         };
  
//         img.onerror = () => {
//           reject(new Error('There was an error loading the image.'));
//         };
  
//         img.src = e.target?.result as string;
//       };
  
//       reader.onerror = () => {
//         reject(new Error('There was an error reading the file.'));
//       };
  
//       reader.readAsDataURL(fileInput);
//     });
//   }

  export const getImageDimensionsFromUrl = async (url:string):Promise<{width:number, height:number}> => {
    return new Promise((resolve, reject) => {
        // Create a new Image object
        const img = new Image();

        // Assign the URL of the image to the src property
        img.src = url;

        // Wait for the image to load
        img.onload = () => {
            // Resolve the promise with the dimensions
            resolve({ width: img.width, height: img.height });
        };

        // Handle error in case the image fails to load
        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
} 