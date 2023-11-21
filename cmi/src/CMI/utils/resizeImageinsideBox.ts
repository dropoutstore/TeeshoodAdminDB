export function resizeDimensions(
  maxWidth: number,
  maxHeight:number,
  currentWidth:number,
  currentHeight:number,
) {
  // Calculate the aspect ratio
  const aspectRatio = currentWidth / currentHeight;

  // Initialize new dimensions to be the same as the current ones
  let newWidth = currentWidth;
  let newHeight = currentHeight;

  // Check if the current width is greater than the max width
  if (currentWidth > maxWidth) {
    newWidth = maxWidth;
    newHeight = Math.round(newWidth / aspectRatio);
  }

  // Check if the new height is still greater than the max height
  if (newHeight > maxHeight) {
    newHeight = maxHeight;
    newWidth = Math.round(newHeight * aspectRatio);
  }

  return {width: newWidth, height: newHeight};
}
