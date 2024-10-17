import { buildCreatureIndex } from "$lib/search/index-builder";
import { buildSpellIndex } from "$lib/search/spells";
import { loadCreatures, loadSpells } from "$lib/utils/json-loaders";
import FlexSearch from "flexsearch";
import { indexOptions } from "$lib/search/index-options";
import type { Creature } from "$lib/types/creature";

// Must be placed before other indexes.
// This is because the indexes below use the site index to link the pages.
export const siteIndex = new FlexSearch.Index(indexOptions);

export const creatures: Creature[] = loadCreatures();
export const creatureIndex = buildCreatureIndex();

export const spells = loadSpells();
export const spellIndex = buildSpellIndex();
