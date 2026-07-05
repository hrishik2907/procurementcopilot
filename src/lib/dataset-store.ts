import { useEffect, useState } from "react";

const KEY = "pc.workspace.entered.v3";

export function useDatasetLoaded() {
  const [loaded, setLoaded] = useState<boolean | null>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setLoaded(window.localStorage.getItem(KEY) === "1");
  }, []);
  const setDatasetLoaded = (v: boolean) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(KEY, v ? "1" : "0");
    }
    setLoaded(v);
  };
  return { loaded, setDatasetLoaded };
}

export function markDatasetLoaded() {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, "1");
}
