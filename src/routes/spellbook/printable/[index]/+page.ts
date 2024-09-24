import { error } from "@sveltejs/kit";

export const ssr = false;

export const load = async ({ params }) => {
    if (!params.index) {
        error(400, "No index provided");
    }

    return { index: Number(params.index) };
}
