<script lang="ts">
    import { page } from "$app/stores";
    import { TabAnchor, TabGroup } from "@skeletonlabs/skeleton";
    import { navRoute } from "$lib/constants/navigation";
</script>

<TabGroup
        justify="justify-center"
        active="variant-filled-primary"
        hover="hover:variant-soft-primary"
        flex="flex-1"
        rounded=""
        border="border-t-2 border-surface-900"
        class="w-full bg-surface-100-800-token">
    {#each navRoute as r}
        {#if r.show}
            <TabAnchor href={r.route} selected={$page.url.pathname.includes(r.route) && r.route !== "/"}>
                <svelte:fragment slot="lead">
                    <div class="flex justify-center">
                        <svelte:component this={r.icon}/>
                    </div>
                </svelte:fragment>
                <span>{r.label}</span>
            </TabAnchor>
        {/if}
    {/each}
</TabGroup>
