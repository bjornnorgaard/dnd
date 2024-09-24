<script lang="ts">
    import { onMount } from "svelte";

    export let title: string = "";

    onMount(() => {
        window.print();
        history.back()
    });
</script>

<svelte:head>
    <title>{title ? `${title} - ` : ""}D&D By Bear - Tools for Dungeons & Dragons 5e</title>
</svelte:head>

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