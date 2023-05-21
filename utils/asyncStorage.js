import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getItem(key) {
  const value = await AsyncStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export async function setItem(key, value) {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeItem(key) {
  return AsyncStorage.removeItem(key);
}

export async function clear() {
  return await AsyncStorage.clear();
}
