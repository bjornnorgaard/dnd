import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Spell } from "$lib/types/spell";

export class Spellbook {
    name: string = "";
    spells: Spell[] = [];
}

function createSpellbookStore() {
    if (!browser) {
        return;
    }

    const key: string = "spellbook";

    let rawValue: string | null = localStorage.getItem(key);
    if (rawValue === null) {
        rawValue = JSON.stringify([]);
        localStorage.setItem(key, rawValue);
    }

    const parsedValue: Spellbook[] = JSON.parse(rawValue);
    const store = writable<Spellbook[]>(parsedValue);

    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

export const spellbook = createSpellbookStore() ?? writable<Spellbook[]>([]);

