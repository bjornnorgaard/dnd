<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";

    export let title: string;
    export let desc: string | null = null;
</script>

<div class="mx-auto max-w-screen-md px-4 space-y-8 py-[2vw]">
    <AppBar background="bg-transparent" padding="">
        <svelte:fragment slot="headline">
            <h1 class="text-primary-500 h1 font-bold">{title}</h1>
            {#if desc}
                <p>{desc}</p>
            {/if}
        </svelte:fragment>
    </AppBar>

    <slot/>
</div>
