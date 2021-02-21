import React, {useState, useEffect, Dispatch, SetStateAction} from 'react';

export const useStickyState = <T>(defaultValue: T, key: string) : [T, Dispatch<SetStateAction<T>>] =>  {

    const [value, setValue] = useState<T>(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue 
        ? JSON.parse(stickyValue)
        : defaultValue;
    });
    useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue];
  }