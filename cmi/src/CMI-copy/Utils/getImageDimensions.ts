export async function getImageDimensions(fileInput:File):Promise<{width:number, height:number}> {
    return new Promise((resolve, reject) => {
  
      if (!fileInput.type.match('image.*')) {
        reject(new Error('The selected file is not an image.'));
        return;
      }
  
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const img = new Image();
  
        img.onload = () => {
          resolve({ width: img.width, height: img.height });
        };
  
        img.onerror = () => {
          reject(new Error('There was an error loading the image.'));
        };
  
        img.src = e.target?.result as string;
      };
  
      reader.onerror = () => {
        reject(new Error('There was an error reading the file.'));
      };
  
      reader.readAsDataURL(fileInput);
    });
  }