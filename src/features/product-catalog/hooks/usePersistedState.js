'use client';

import { useState } from 'react';

export default function usePersistedState(key = '', defaultValue = null) {
  const [state, setState] = useState(() => {
    if (typeof window !== 'undefined') {
      const value = JSON.parse((localStorage.getItem(key) || null)) || defaultValue;
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    }
    return defaultValue;
  });

  const updateState = (newState) => {
    localStorage.setItem(key, JSON.stringify(newState));
    setState(newState);
  };

  return [state, updateState];
}