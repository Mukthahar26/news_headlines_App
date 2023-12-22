import EncryptedStorage from 'react-native-encrypted-storage';

export const setStorage = async (key: string, value: any) => {
  try {
    return await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return false;
  }
};

export const getStorage = async (key: string) => {
  try {
    const data = await EncryptedStorage.getItem(key);
    if (data) return JSON.parse(data);
    else return false;
  } catch (e) {
    return false;
  }
};
