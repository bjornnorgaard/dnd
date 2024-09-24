import type { Creature } from "$lib/data/creature";
import creatures from "$lib/data/creatures.json";
import spells from "$lib/data/spells.json";
import type { Spell } from "$lib/data/spell";

export function loadCreatures(): Creature[] {
    const data: any = creatures;
    if (!data.results) {
        throw new Error("No creature data found");
    }

    return data.results;
}

export function loadSpells(): Spell[] {
    const data: any = spells;
    if (!data.results) {
        throw new Error("No spell data found");
    }

    return data.results;
}
