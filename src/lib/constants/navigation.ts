import { BookHeart, Library, Rabbit, Swords } from "lucide-svelte";
import { routes } from "$lib/constants/routes";

export interface NavRoute {
    label: string;
    route: string;
    icon: any;
}

export const navRoute: NavRoute[] = [
    // { label: "Home", route: routes.home(), icon: Home },
    { label: "Combat", route: routes.combat(), icon: Swords },
    { label: "Beasts", route: routes.beasts(), icon: Rabbit },
    { label: "Spells", route: routes.spells(), icon: Library },
    { label: "Sheet", route: routes.characters(), icon: BookHeart },
];
