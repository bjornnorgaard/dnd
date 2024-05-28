<script lang="ts">

    import { Flame } from "lucide-svelte";

    const slots = [
        { slots: [ 1, 1, 1, 1 ] },
        { slots: [ 1, 1, 1 ] },
        { slots: [ 1, 1, 1 ] },
        { slots: [ 1, 1, 1 ] },
        { slots: [ 1, 1, 1 ] },
        { slots: [ 1, 1 ] },
        { slots: [ 1, 1 ] },
        { slots: [ 1 ] },
        { slots: [ 1 ] },
    ];

    function toggleSlot(levelIndex: number, valueIndex: number) {
        slots[levelIndex].slots[valueIndex] = !slots[levelIndex].slots[valueIndex] ? 1 : 0;
    }
</script>

<div class="flex flex-col">
    {#each slots as level, li}
        <div class="flex items-center">
            <div class="w-14 px-4 text-5xl font-bold">{li + 1}</div>
            {#each level.slots as v, vi}
                <button class="m-1 btn btn-icon hover:animate-pulse"
                        class:variant-filled-primary={v}
                        on:click={() => toggleSlot(li, vi)}>
                    <Flame/>
                </button>
            {/each}
        </div>
    {/each}
</div>
