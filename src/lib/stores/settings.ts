import { persisted } from "svelte-persisted-store";

export const settings = persisted("settings", {
    showCombatRoute: true,
    showSheetsRoute: true,
});
