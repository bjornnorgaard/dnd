import { error } from "@sveltejs/kit";

import { routes } from "$lib/components/navigation/routes";

export const load = async ({ params, fetch }) => {
    if (!params.slug) {
        error(400, "No slug provided");
    }

    const spell = await fetch(routes.api_spells_slug(params.slug)).then(r => r.json());
    if (!spell) {
        error(404, "Spell not found");
    }

    return { spell: spell };
}
