import { Home, Library, Rabbit, Swords } from "lucide-svelte";
import { routes } from "$lib/constants/routes";

export interface NavRoute {
    label: string;
    route: string;
    icon: any;
    dmOnly: boolean;
}

export const navRoutes: NavRoute[] = [
    { label: "Home", route: routes.home(), icon: Home, dmOnly: false },
    { label: "Combat", route: routes.combat(), icon: Swords, dmOnly: true },
    { label: "Beasts", route: routes.beasts(), icon: Rabbit, dmOnly: true },
    { label: "Spells", route: routes.spells(), icon: Library, dmOnly: false },
    { label: "Settings", route: routes.settings(), icon: Library, dmOnly: false },
];
