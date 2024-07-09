<script lang="ts">
    import { Minus, Plus } from "lucide-svelte";
    import { slide } from "svelte/transition";

    export let level: number;
    export let charges: number[];

    function addSlot() {
        charges = [ ...charges, 1 ];
    }

    function removeSlot() {
        if (!charges.length) {
            return;
        }
        charges = charges.slice(0, -1);
    }

    function toggleSlot(i: number) {
        charges[i] = charges[i] === 0 ? 1 : 0;
        charges = [ ...charges ];
    }
</script>

<div class="flex flex-col gap-2 items-center">
    <button class="btn-icon btn-icon-sm variant-outline hover:variant-filled-primary"
            type="button"
            on:click={() => addSlot()}>
        <Plus/>
    </button>

    {#if !charges}
        <button in:slide out:slide
                type="button"
                class="btn-icon text-2xl opacity-50">
            {level}
        </button>
    {/if}

    {#each charges as v, i (i)}
        <button in:slide out:slide
                on:click={() => toggleSlot(i)}
                type="button"
                class="btn-icon text-2xl font-bold"
                disabled={v < 0}
                class:variant-outline-primary={v === 0}
                class:variant-filled-primary={v === 1}>
            {level} {v}
        </button>
    {/each}

    <button class="btn-icon btn-icon-sm variant-outline hover:variant-filled-primary"
            type="button"
            on:click={() => removeSlot()}>
        <Minus/>
    </button>
</div>
