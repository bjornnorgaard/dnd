import { searchSite } from "$lib/search/site-search";
import { json } from "@sveltejs/kit";
import { Role } from "$lib/stores/settings";

export const GET = ({ url }) => {
    let query = url.searchParams.get("query") ?? "";
    const limit = Number(url.searchParams.get("limit")) || 5;
    const offset = Number(url.searchParams.get("offset")) || 0;

    const role = url.searchParams.get("role") as Role;
    if (role === Role.Pc) {
        query = `spell ${query}`;
    }

    const results = searchSite(query, limit, offset);
    return json(results);
}
