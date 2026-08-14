import { get, set, del } from "idb-keyval";
import type { StateStorage } from "zustand/middleware";

/**
 * Zustand `persist` storage adapter backed by IndexedDB (via idb-keyval) instead of
 * localStorage — keeps resume/job/profile data off the synchronous, size-limited
 * localStorage API per the app's "IndexedDB for local storage" requirement.
 */
export const idbStorage: StateStorage = {
  getItem: async (name: string) => {
    return (await get(name)) ?? null;
  },
  setItem: async (name: string, value: string) => {
    await set(name, value);
  },
  removeItem: async (name: string) => {
    await del(name);
  },
};
