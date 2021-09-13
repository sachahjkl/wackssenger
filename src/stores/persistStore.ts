/// <reference types="svelte/store" />

import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

export function persistStore<T>(key: string, initial: T): Writable<T> {
  const persist = localStorage.getItem(key);
  const data = persist ? JSON.parse(persist) : initial;
  //if sub is broken, sets value to current local storage value
  const store = writable<T>(data, () => {
    const unsubscribe = store.subscribe((value: T) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    return unsubscribe;
  });
  return store;
}
