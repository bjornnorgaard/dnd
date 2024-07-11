import { BookHeart, Cog, Library, Rabbit, Swords } from "lucide-svelte";
import { routes } from "$lib/constants/routes";
import { dev } from "$app/environment";
import { settings } from "$lib/stores/settings";
import { get } from "svelte/store";

export interface NavRoute {
    label: string;
    route: string;
    icon: any;
    show: boolean;
}

export const navRoute: NavRoute[] = [
    // { label: "Home", route: routes.home(), icon: Home, show: true },
    { label: "Combat", route: routes.combat(), icon: Swords, show: get(settings).showCombatRoute },
    { label: "Beasts", route: routes.beasts(), icon: Rabbit, show: true },
    { label: "Spells", route: routes.spells(), icon: Library, show: true },
    { label: "Sheets", route: routes.characters(), icon: BookHeart, show: get(settings).showSheetsRoute },
    { label: "Settings", route: routes.settings(), icon: Cog, show: true },
];
