import type { Creature } from "$lib/types/creature";
import creatures from "$lib/data/creatures.json";
import spells from "$lib/data/spells.json";
import type { Spell } from "$lib/types/spell";

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
