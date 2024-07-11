<script lang="ts">
    import "../app.pcss";
    import { storePopup } from '@skeletonlabs/skeleton';
    import NavSide from "$lib/components/NavSide.svelte";
    import { statblock } from "$lib/stores/statblock";
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import { slide } from "svelte/transition";
    import NavBottom from "$lib/components/NavBottom.svelte";
    import { inject } from '@vercel/analytics'
    import { dev } from "$app/environment";
    import CreatureStatblock from "$lib/components/CreatureStatblock.svelte";
    import GlobalSearch from "$lib/components/GlobalSearch.svelte";
    import OpenGraph from "$lib/components/OpenGraph.svelte";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    inject({ mode: dev ? 'development' : 'production' });
</script>

<OpenGraph/>

<GlobalSearch/>

<div class="flex">
    <div class="fixed hidden h-full md:block">
        <NavSide/>
    </div>

    <main class="h-full w-full">
        <slot/>
    </main>

    {#if $statblock.isOpen}
        <div class="fixed right-0 w-96 p-4" in:slide={{axis: "x", duration: 300}} out:slide={{axis: "x", duration: 300}}>
            <CreatureStatblock creature={$statblock.creature}/>
        </div>
    {/if}

    <div class="fixed bottom-0 w-full md:hidden">
        <NavBottom/>
    </div>
</div>
