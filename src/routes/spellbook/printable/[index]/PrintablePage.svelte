<script lang="ts">
    import { Printer } from "lucide-svelte";
    import { goto } from "$app/navigation";
    import { routes } from "$lib/components/navigation/routes";
    import { dev } from "$app/environment";

    export let title: string = "";

    async function print() {
        window.print();
        if (!dev) {
            await goto(routes.spellbook())
        }
    }
</script>

<svelte:head>
    <title>{title}</title>
</svelte:head>

<button class="fixed right-0 bottom-0 m-4 print:hidden animate-bounce rounded-full font-bold btn btn-xl variant-filled-primary" on:click={async () => print()}>
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