import { BookHeart, Library, Rabbit, Swords } from "lucide-svelte";
import { routes } from "$lib/constants/routes";
import { dev } from "$app/environment";

export interface NavRoute {
    label: string;
    route: string;
    icon: any;
    show: boolean;
}

export const navRoute: NavRoute[] = [
    // { label: "Home", route: routes.home(), icon: Home, show: true },
    { label: "Combat", route: routes.combat(), icon: Swords, show: true },
    { label: "Beasts", route: routes.beasts(), icon: Rabbit, show: true },
    { label: "Spells", route: routes.spells(), icon: Library, show: true },
    { label: "Sheet", route: routes.characters(), icon: BookHeart, show: dev },
];
