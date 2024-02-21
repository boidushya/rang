import { StateStorage, createJSONStorage } from "zustand/middleware";

const getNowInUTC = () => {
  const date = new Date();
  return new Date(
    Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate(),
      date.getUTCHours(),
      date.getUTCMinutes(),
      date.getUTCSeconds()
    )
  );
};

const storage: StateStorage = {
  getItem(key) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = getNowInUTC();

    if (now.getTime() > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }
    return item.value;
  },

  setItem(key, value) {
    const now = getNowInUTC();
    now.setUTCHours(24, 0, 0, 0);

    const item = {
      value: value,
      expiry: now.getTime(),
    };
    localStorage.setItem(key, JSON.stringify(item));
  },

  removeItem(key) {
    window.localStorage.removeItem(key);
  },
};

const expiryStorage = createJSONStorage(() => storage);

export default expiryStorage;
