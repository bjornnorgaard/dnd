import { json } from "@sveltejs/kit";
import { searchSpells } from "$lib/search/spells";
import type { Spell } from "$lib/types/spell";

export const GET = ({ url }) => {
    const query = url.searchParams.get("query") ?? "a";
    const limit = Number(url.searchParams.get("limit")) ?? 5;
    const offset = Number(url.searchParams.get("offset")) ?? 0;
    const a5e = url.searchParams.get("a5e") === "true";

    const results: Spell[] = searchSpells(query, limit, offset, a5e);
    return json(results);
}
