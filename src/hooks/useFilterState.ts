"use client";

import { useState, useCallback } from "react";

export function useFilterState<T extends string>(initialValue: T | "all" = "all") {
  const [value, setValue] = useState<T | "all">(initialValue);

  const handleChange = useCallback((newValue: T | "all") => {
    setValue(newValue);
  }, []);

  return [value, handleChange] as const;
}
