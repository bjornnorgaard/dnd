import { json } from "@sveltejs/kit";
import { superIndex } from "../../../../hooks.server";

export const GET = ({ url }) => {
    let query = url.searchParams.get("query") ?? "";

    const results = superIndex.search({
        query: query,
        limit: 10,
        enrich: true,
    })

    return json(results);
}
