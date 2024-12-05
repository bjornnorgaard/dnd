<script lang="ts">
    import { Class } from "$lib/constants/classes";

    let selectedClass = $state("Classes");
    let classes = [ "Classes", ...Object.values(Class) ];

    const { update } = $props();

    function emitUpdate(e: Event): void {
        update(selectedClass);
    }
</script>

<div class="flex justify-between">
    <select class="w-fit select" bind:value={selectedClass} onchange={emitUpdate}>
        {#each classes as o}
            <option value={o}>{o}</option>
        {/each}
    </select>
</div>
