// import FontFaceObserver from 'fontfaceobserver';

interface LoadCustomFontProps {
  fontName: string;
  fontURL: string;
}

export async function loadCustomFont({ fontName, fontURL }: LoadCustomFontProps): Promise<void> {
  // Create a new style element
  const style = document.createElement('style');

  // Create the @font-face rule
  const fontFaceRule = `
    @font-face {
      font-family: '${fontName}';
      src: url('${fontURL}');
    }
  `;

  // Append the rule to the style element
  style.appendChild(document.createTextNode(fontFaceRule));

  // Append the style element to the head of the document
  document.head.appendChild(style);

  // Apply the font to the body or specific elements
  document.body.style.fontFamily = fontName;

//   try {
//     const font = new FontFaceObserver(fontName, {
//       weight: 400,
//     });

//     // Await the font to be loaded
//     await font.load();
//     console.log('Font is available');
//   } catch (error) {
//     console.log('Font is not available');
//     throw error; // Reject the promise if the font fails to load
//   }
}
