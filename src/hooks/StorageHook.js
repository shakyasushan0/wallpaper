import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function getSavedValue(key, initialValue) {
  const savedValue = AsyncStorage.getItem(key);

  if (savedValue) return savedValue;

  if (initialValue instanceof Function) return initialValue();

  return initialValue;
}

export default function useAsyncStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return getSavedValue(key, initialValue);
  });

  useEffect(() => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}
