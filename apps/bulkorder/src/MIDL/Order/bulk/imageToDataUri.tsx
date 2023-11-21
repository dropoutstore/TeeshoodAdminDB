export function convertImageToDataURI(inputfile: File): Promise<string> {
    return new Promise((resolve, reject) => {
        // Create a FileReader to read the file content
        const reader = new FileReader();

        // Define the onload callback
        reader.onload = function(event: ProgressEvent<FileReader>) {
            if(event.target && event.target.result) {
                // Get the Data URI from the event target result
                const dataURI = event.target.result as string;
                
                // Resolve the promise with the dataURI
                resolve(dataURI);
            } else {
                reject("Failed to read the file.");
            }
        };

        // Define the onerror callback
        reader.onerror = function(event) {
            reject("Error reading file: " + event.target?.error?.message);
        };

        // Read the file as a Data URI
        reader.readAsDataURL(inputfile);
    });
}

