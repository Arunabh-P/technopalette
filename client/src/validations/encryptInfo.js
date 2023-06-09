import CryptoJS from 'crypto-js';

export const encodeData = (data) => {
  let ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    'mypvtkey'
  ).toString();
  return ciphertext;
};

export const decodeData = (data) => {
  let bytes = CryptoJS.AES.decrypt(data, 'mypvtkey');
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
