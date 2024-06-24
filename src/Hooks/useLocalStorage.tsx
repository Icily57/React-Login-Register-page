import { useState, useEffect } from 'react';
import axios from 'axios';

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(error);
      return initialValue;
    }
  });

  const setValue = async (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Update the value in localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Make a request to your API to update the value
      await axios.post('https://localhost:5000', {
        key,
        value: valueToStore
      });
    } catch (error) {
      console.warn(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
