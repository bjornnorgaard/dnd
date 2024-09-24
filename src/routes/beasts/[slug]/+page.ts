import { error } from "@sveltejs/kit";

import { routes } from "$lib/components/navigation/routes";

export const load = async ({ params, fetch }) => {
    if (!params.slug) {
        error(400, "No slug provided");
    }

    const creature = await fetch(routes.api_creature_slug(params.slug)).then(r => r.json());
    if (!creature) {
        error(404, "Creature not found");
    }

    return { creature: creature };
}
