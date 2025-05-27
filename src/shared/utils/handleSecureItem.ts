import CryptoJS from 'crypto-js';
import { createJSONStorage } from 'zustand/middleware';

const SECRET_KEY = process.env.NEXT_PUBLIC_SECURE_KEY!;

export const encryptedStorage = createJSONStorage(() => ({
  getItem: (name) => {
    const encrypted = localStorage.getItem(name);
    if (!encrypted) return null;

    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  },
  setItem: (name, value) => {
    const raw = JSON.stringify(value);
    const encrypted = CryptoJS.AES.encrypt(raw, SECRET_KEY).toString();
    localStorage.setItem(name, encrypted);
  },
  removeItem: (name) => localStorage.removeItem(name),
}));
