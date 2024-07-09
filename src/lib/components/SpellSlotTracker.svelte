<script lang="ts">

    import { Flame } from "lucide-svelte";
    import type { SpellCharges } from "$lib/types/spell-charges";

    const slots: SpellCharges[] = [
        { level: 1, charges: [ 1, 1, 1, 1 ] },
        { level: 2, charges: [ 1, 1, 1 ] },
        { level: 3, charges: [ 1, 1, 1 ] },
        { level: 4, charges: [ 1, 1, 1 ] },
        { level: 5, charges: [ 1, 1, 1 ] },
        { level: 6, charges: [ 1, 1 ] },
        { level: 7, charges: [ 1, 1 ] },
        { level: 8, charges: [ 1 ] },
        { level: 9, charges: [ 1 ] },
    ];

    function toggleSlot(levelIndex: number, valueIndex: number) {
        slots[levelIndex].charges[valueIndex] = !slots[levelIndex].charges[valueIndex] ? 1 : 0;
    }
</script>

<div class="flex flex-col">
    {#each slots as slot, li}
        <div class="flex items-center">
            <div class="w-10 text-4xl font-bold">{slot.level}</div>
            {#each slot.charges as v, vi}
                <button class="m-1 btn btn-icon hover:animate-pulse"
                        class:variant-filled-primary={v}
                        on:click={() => toggleSlot(li, vi)}>
                    <Flame/>
                </button>
            {/each}
        </div>
    {/each}
</div>
