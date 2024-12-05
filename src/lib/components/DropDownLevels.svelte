<script lang="ts">

    let levels = [ "Levels", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    let selectedLevel = $state("Levels");

    const { update } = $props();

    function emitUpdate(): void {
        update(selectedLevel);
    }
</script>

<div class="flex justify-between">
    <select class="w-fit select" bind:value={selectedLevel} onchange={emitUpdate}>
        {#each levels as o}
            <option value={o}>{o}</option>
        {/each}
    </select>
</div>
