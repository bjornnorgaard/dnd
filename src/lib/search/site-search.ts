import { siteIndex } from "../../hooks.server";

export function searchSite(query: string, limit: number = 5, offset: number = 0): string[] {
    const options: any = { limit: limit, offset: offset, suggest: true };
    let results = siteIndex.search(query, options);
    return results.map(r => r as string);
}
