<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let levels = [ "Levels", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    let selectedLevel = "Levels";

    function emitUpdate(): void {
        dispatch("update", { level: selectedLevel });
    }
</script>

<div class="flex justify-between">
    <select class="w-fit select" bind:value={selectedLevel} on:change={() => emitUpdate()}>
        {#each levels as o}
            <option value={o}>{o}</option>
        {/each}
    </select>
</div>
