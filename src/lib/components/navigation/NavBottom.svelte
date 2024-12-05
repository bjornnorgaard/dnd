<script lang="ts">
    import { page } from "$app/stores";
    import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
    import { navRoutes } from "$lib/components/navigation/navigation";
    import { derived } from "svelte/store";
    import { Role, settings } from "$lib/stores/settings";

    const routes = derived(settings, (s) => {
        if (s.role === Role.Pc) {
            return navRoutes.filter(r => r.dmOnly === false);
        }
        return navRoutes;
    });
</script>

<TabGroup
        justify="justify-center"
        active="variant-filled-primary"
        hover="hover:variant-soft-primary"
        flex="flex-1"
        rounded=""
        border="border-t-2 border-surface-900"
        regionList="print:hidden"
        class="w-full bg-surface-100-800-token">
    {#each $routes as r}
        <TabAnchor href={r.route} selected={$page.url.pathname.includes(r.route) && r.route !== "/"}>
            {#snippet lead()}
                    
                    <div class="flex justify-center">
                        <r.icon/>
                    </div>
                
                    {/snippet}
            <span>{r.label}</span>
        </TabAnchor>
    {/each}
</TabGroup>
