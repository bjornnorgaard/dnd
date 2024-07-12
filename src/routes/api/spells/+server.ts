import type { Spell } from "$lib/types/spell";
import { json } from "@sveltejs/kit";
import { searchSpells } from "$lib/search/spells";

export const GET = ({ url }) => {
    const query = url.searchParams.get("query") ?? "a";
    const limit = Number(url.searchParams.get("limit")) ?? 5;
    const offset = Number(url.searchParams.get("offset")) ?? 0;

    const results: Spell[] = searchSpells(query, limit, offset);
    return json(results);
}
