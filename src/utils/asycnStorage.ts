import AsycnStorage from '@react-native-community/async-storage';

export const setToLocal = async (key: string, val?: string) => {
  try {
    const value = JSON.stringify(val);
    await AsycnStorage.setItem(key, value);
    return;
  } catch (err) {
    console.log(err);
  }
};

export const getToLocal = async (key: string) => {
  try {
    const res = await AsycnStorage.getItem(key);
    return JSON.parse(res as string);
  } catch (err) {
    console.log(err);
  }
};

export const removeLocal = async (key: string) => {
  try {
    await AsycnStorage.removeItem(key);
  } catch (err) {
    console.log(err);
  }
};
