import { Book, Home, Library, Rabbit, Settings } from "lucide-svelte";
import { routes } from "$lib/components/navigation/routes";

export interface NavRoute {
    label: string;
    route: string;
    icon: any;
    dmOnly: boolean;
}

export const navRoutes: NavRoute[] = [
    { label: "Home", route: routes.home(), icon: Home, dmOnly: false },
    { label: "Beasts", route: routes.beasts(), icon: Rabbit, dmOnly: true },
    { label: "Spells", route: routes.spells(), icon: Library, dmOnly: false },
    { label: "Spellbook", route: routes.spellbook(), icon: Book, dmOnly: false },
    { label: "Settings", route: routes.settings(), icon: Settings, dmOnly: false },
];
