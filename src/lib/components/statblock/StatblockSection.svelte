<script lang="ts">
    import StatblockSectionDivider from "$lib/components/statblock/StatblockSectionDivider.svelte";

    export let title: string;
    export let condition: boolean;
</script>

{#if condition}
    <div class="pt-4">
        <p class="text-xl font-bold tracking-wide">{title}</p>
        <StatblockSectionDivider/>
        <div class="space-y-4 pt-4">
            <slot/>
        </div>
    </div>
{/if}
