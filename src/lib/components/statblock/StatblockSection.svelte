<script lang="ts">
    import StatblockSectionDivider from "$lib/components/statblock/StatblockSectionDivider.svelte";

    interface Props {
        title: string;
        condition: boolean;
        children?: import('svelte').Snippet;
    }

    let { title, condition, children }: Props = $props();
</script>

{#if condition}
    <div class="pt-4">
        <p class="text-xl font-bold tracking-wide">{title}</p>
        <StatblockSectionDivider/>
        <div class="space-y-4 pt-4">
            {@render children?.()}
        </div>
    </div>
{/if}
