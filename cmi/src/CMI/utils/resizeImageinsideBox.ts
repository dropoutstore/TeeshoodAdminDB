export function resizeDimensions(
  maxWidth: number,
  maxHeight: number,
  currentWidth: number,
  currentHeight: number
) {
  // Calculate the aspect ratio
  const aspectRatio = currentWidth / currentHeight;

  // Initialize new dimensions
  let newWidth, newHeight;

  // If width is the limiting factor
  if (maxWidth / maxHeight < aspectRatio) {
    newWidth = maxWidth;
    newHeight = Math.round(maxWidth / aspectRatio);
  }
  // If height is the limiting factor
  else {
    newHeight = maxHeight;
    newWidth = Math.round(maxHeight * aspectRatio);
  }

  return { width: newWidth, height: newHeight };
}
