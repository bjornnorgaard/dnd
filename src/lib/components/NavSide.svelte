<script lang="ts">
    import { AppRail, AppRailAnchor } from "@skeletonlabs/skeleton";
    import { page } from "$app/stores";
    import { navRoutes } from "$lib/constants/navigation";
    import NavSearchButton from "$lib/components/NavSearchButton.svelte";
    import { derived } from "svelte/store";
    import { Role, settings } from "$lib/stores/settings";

    const routes = derived(settings, (s) => {
        if (s.role === Role.Pc) {
            return navRoutes.filter(r => r.dmOnly === false);
        }
        return navRoutes;
    });
</script>

<div class="h-full border-r-2 border-surface-900">
    <AppRail>
        <svelte:fragment slot="lead">
            <NavSearchButton/>
        </svelte:fragment>

        {#each $routes as r}
            <AppRailAnchor href={r.route} title={r.label} selected={$page.url.pathname.includes(r.route) && r.route !== "/"}>
                <svelte:fragment slot="lead">
                    <svelte:component this={r.icon}/>
                </svelte:fragment>
                <span>{r.label}</span>
            </AppRailAnchor>
        {/each}
    </AppRail>
</div>
