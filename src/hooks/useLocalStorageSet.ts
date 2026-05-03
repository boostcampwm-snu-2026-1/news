import { useCallback, useEffect, useMemo, useState } from "react";

export function useLocalStorageSet(key: string) {
  const [values, setValues] = useState<Set<string>>(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      const parsedValue: unknown = storedValue ? JSON.parse(storedValue) : [];

      if (!Array.isArray(parsedValue)) {
        return new Set();
      }

      return new Set(parsedValue.filter((item): item is string => typeof item === "string"));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(Array.from(values)));
  }, [key, values]);

  const add = useCallback((value: string) => {
    setValues((prevValues) => new Set(prevValues).add(value));
  }, []);

  const remove = useCallback((value: string) => {
    setValues((prevValues) => {
      const nextValues = new Set(prevValues);
      nextValues.delete(value);
      return nextValues;
    });
  }, []);

  return useMemo(() => ({ values, add, remove }), [add, remove, values]);
}
