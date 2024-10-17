import { writable } from "svelte/store";
import { browser } from "$app/environment";
import type { Spell } from "$lib/types/spell";

export class SpellbookStoreType {
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

    const parsedValue: SpellbookStoreType[] = JSON.parse(rawValue);
    const { set, subscribe, update } = writable<SpellbookStoreType[]>(parsedValue);

    subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return {
        set, subscribe, update
    };
}

export const spellbookStore = createSpellbookStore() ?? writable<SpellbookStoreType[]>([]);

export const activeSpellbookIndex = writable<number>(0);

