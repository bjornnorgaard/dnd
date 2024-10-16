<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    let classes = ["all","artificer","barbarian","bard","cleric","druid","fighter","monk","paladin","ranger","rogue","sorcerer","warlock","wizard"];
    let selectedClass = "all";

    function emitUpdate(): void {
        dispatch("classUpdate", { class:selectedClass });
    }
</script>


<div class="flex justify-between">

    <select class="w-fit select" bind:value={selectedClass} on:change={() => emitUpdate()}>
        {#each classes as o}
            <option value={o}>class: {o}</option>
        {/each}
    </select>

</div>