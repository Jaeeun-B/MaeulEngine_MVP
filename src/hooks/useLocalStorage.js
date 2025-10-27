import { useEffect, useState } from 'react';

export default function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initial;
    } catch (e) {
      void e;
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      void e;
    }
  }, [key, value]);

  return [value, setValue];
  }