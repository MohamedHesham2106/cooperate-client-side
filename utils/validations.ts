// Function to validate CVC
export function validateCVC(cvc: string): boolean {
  const cvcRegex = /^[0-9]{3,4}$/;
  return cvcRegex.test(cvc);
}

// Function to validate card number
export function validateCardNumber(cardNumber: string): boolean {
  const cardNumberRegex = /^[0-9]{13,19}$/;
  return cardNumberRegex.test(cardNumber);
}

// Function to validate cardholder name
export function validateCardholderName(name: string): boolean {
  const nameRegex = /^[a-zA-Z\s]+$/;
  return nameRegex.test(name);
}
export const projectFileType = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/x-rar-compressed',
  'application/x-7z-compressed',
  'application/zip',
  'application/gzip',
  'application/x-tar',
  'application/x-bzip',
  'application/x-bzip2',
  'application/x-ace-compressed',
  'application/x-gzip',
  'application/x-stuffit',
  'application/x-stuffitx',
  'application/x-tar-gz',
  'application/x-tar-bz2',
  'application/x-tar-lzma',
  'application/x-tar-xz',
  'application/x-zip-compressed',
  'image/jpeg',
  'image/png',
];
