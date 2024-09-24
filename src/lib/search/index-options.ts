import type { IndexOptions } from "flexsearch";

export const indexOptions: IndexOptions<string> = {
    tokenize: "forward",
    cache: 100,
    optimize: true,
    preset: "match",
};
