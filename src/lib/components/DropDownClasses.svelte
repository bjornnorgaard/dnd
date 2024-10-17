<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { Class } from "$lib/constants/classes";

    const dispatch = createEventDispatcher();

    let selectedClass = "All";
    let classes = [ "All", ...Object.values(Class) ];

    function emitUpdate(): void {
        dispatch("classUpdate", { class: selectedClass });
    }
</script>


<div class="flex justify-between">

    <select class="w-fit select" bind:value={selectedClass} on:change={() => emitUpdate()}>
        {#each classes as o}
            <option value={o}>class: {o}</option>
        {/each}
    </select>

</div>