export const defaultErrorMessage = 'Something went wrong, Try again.';

export function camelToNormal(camelCaseStr: string): string {
  // First, insert spaces before capital letters to split words
  const result = camelCaseStr
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');

  // Then, split the string into words, capitalize the first letter of the first word,
  // convert the rest to lowercase, and join the words back together with spaces
  const words = result.split(' ');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  return words.join(' ');
}
