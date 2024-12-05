<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { navRoutes } from "$lib/components/navigation/navigation";
    import NavSearchButton from "$lib/components/navigation/NavSearchButton.svelte";
    import { derived } from "svelte/store";
    import { Role, settings } from "$lib/stores/settings";

    const routes = derived(settings, (s) => {
        if (s.role === Role.Pc) {
            return navRoutes.filter(r => r.dmOnly === false);
        }
        return navRoutes;
    });
</script>

<div class="print:hidden h-full border-r-2 border-surface-900">
    <AppRail>
        <NavSearchButton/>

        {#each $routes as r}
            <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname.includes(r.route) && r.route !== "/"}>
                <div class="flex justify-center">
                    <svelte:component this={r.icon}/>
                </div>
                <span>{r.label}</span>
            </AppRailAnchor>
        {/each}
    </AppRail>
</div>
