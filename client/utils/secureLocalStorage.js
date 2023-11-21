import CryptoJS from 'crypto-js';

const SECRET_KEY = 'some-secret-key';

export const secureLocalStorage = {
  setItem: (key, value) => {
    try {
      const cipheredValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
      localStorage.setItem(key, cipheredValue);
    } catch (e) {
      console.log(e);
    }
  },
  getItem: (key) => {
    try {
      const cipheredValue = localStorage.getItem(key);
      if (!cipheredValue) {
        return null;
      }
      const bytes = CryptoJS.AES.decrypt(cipheredValue, SECRET_KEY);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedData;
    } catch (e) {
      return null;
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
};
