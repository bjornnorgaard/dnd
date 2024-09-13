<script lang="ts">
    import "../app.pcss";
    import { storePopup } from '@skeletonlabs/skeleton';
    import NavSide from "$lib/components/NavSide.svelte";
    import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
    import NavBottom from "$lib/components/NavBottom.svelte";
    import { inject } from '@vercel/analytics'
    import { dev } from "$app/environment";
    import GlobalSearch from "$lib/components/GlobalSearch.svelte";
    import OpenGraph from "$lib/components/OpenGraph.svelte";

    storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

    inject({ mode: dev ? 'development' : 'production' });
</script>

<OpenGraph/>
<GlobalSearch/>

<main class="flex min-h-screen">
    <div class="hidden min-h-screen md:block">
        <NavSide/>
    </div>

    <div class="w-full pb-32">
        <slot/>
    </div>

    <div class="fixed bottom-0 w-full md:hidden">
        <NavBottom/>
    </div>
</main>
