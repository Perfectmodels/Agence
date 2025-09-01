/**
 * Converts a File object to a base64 encoded string.
 * @param file The file to convert.
 * @returns A promise that resolves with the base64 string (without the data URL prefix).
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // The result is in the format "data:[<mediatype>];base64,<data>"
      // We only want the <data> part.
      const base64String = (reader.result as string).split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error("Failed to extract base64 string from file reader result."));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Gets the IANA MIME type of a file.
 * @param file The file to check.
 * @returns The MIME type string (e.g., "image/jpeg").
 */
export const getMimeType = (file: File): string => {
  return file.type;
};
