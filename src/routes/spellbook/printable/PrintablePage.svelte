<script lang="ts">
    import { onMount } from "svelte";
    import { Printer } from "lucide-svelte";

    export let title: string = "";

    onMount(() => {
        window.print();
        history.back()
    });
</script>

<svelte:head>
    <title>{title ? `${title} - ` : ""}D&D By Bear - Tools for Dungeons & Dragons 5e</title>
</svelte:head>

<button class="fixed right-0 bottom-16 m-4 print:hidden animate-bounce rounded-full font-bold btn btn-xl variant-filled-primary sm:bottom-0" on:click={async () => print()}>
    <span>Open Print Menu</span>
    <Printer/>
</button>

<div class="content">
    <slot/>
</div>

<style lang="postcss">
    @media print {
        .content {
            @apply bg-white text-black;
        }
    }
</style>