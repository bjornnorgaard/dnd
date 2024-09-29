import { buildCreatureIndex } from "$lib/search/creatures";
import { buildSpellIndex } from "$lib/search/spells";
import type { Creature } from "$lib/types/creature";
import { loadCreatures, loadSpells } from "$lib/utils/json-loaders";
import FlexSearch from "flexsearch";
import { indexOptions } from "$lib/search/constants";
import { readFileSync } from "node:fs";
import { join } from "path";

// Must be placed before other indexes.
// This is because the indexes below use the site index to link the pages.
export const siteIndex = new FlexSearch.Index(indexOptions);

export const creatures: Creature[] = loadCreatures();
export const creatureIndex = buildCreatureIndex();

export const spells = loadSpells();
export const spellIndex = buildSpellIndex();

export const superIndex = loadSuperIndex();

function loadSuperIndex() {
    const outputDir = join("src", "indexes");
    const outputFile = join(outputDir, "full.json");

    const fileContent = readFileSync(outputFile, "utf-8");
    const parsedObject = JSON.parse(fileContent);

    const searchIndex = new FlexSearch.Document({
        language: "en",
        document: {
            id: "name",
            index: [
                { field: "name", tokenize: "full" },
                { field: "entries", tokenize: "full" },
            ],
        },
    });

    const map = new Map(Object.entries(parsedObject));
    map.forEach((v, k) => {
        searchIndex.import(k, v);
    })

    return searchIndex;
}
