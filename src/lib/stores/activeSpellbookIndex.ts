import { writable } from "svelte/store";

export const activeSpellbookIndex = writable<number>(0);
