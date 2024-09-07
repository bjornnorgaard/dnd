import { writable } from "svelte/store";
import { browser } from "$app/environment";

export enum Role {
    None = "none",
    Dm = "dm",
    Pc = "pc",
}

class Settings {
    role: Role = Role.None;
}

const defaultValue: Settings = new Settings();

function createSettingsStore() {
    if (!browser) {
        return;
    }

    const key: string = "settings";

    let rawValue: string | null = localStorage.getItem(key);
    if (rawValue === null) {
        rawValue = JSON.stringify(defaultValue);
        localStorage.setItem(key, rawValue);
    }

    const parsedValue: Settings = JSON.parse(rawValue);
    const store = writable<Settings>(parsedValue);

    store.subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
    });

    return store;
}

export const settings = createSettingsStore() ?? writable<Settings>(defaultValue);
