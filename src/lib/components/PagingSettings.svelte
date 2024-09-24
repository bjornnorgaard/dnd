<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { ArrowLeft, ArrowRight } from "lucide-svelte";

    const dispatch = createEventDispatcher();

    export let count = 0;
    let limitOptions = [ 5, 10, 20, 50 ];
    let page = 0;
    let limit = 10;

    function emitUpdate(): void {
        const offset = Math.max(0, page * limit);
        dispatch("update", { offset: offset, limit: limit });
    }

    function previous() {
        page = Math.max(0, page - 1);
        emitUpdate();
    }

    function next() {
        page = page + 1;
        emitUpdate();
    }

    function reset() {
        page = 0;
        emitUpdate();
    }
</script>

<div class="flex justify-between">

    <select class="w-fit select" bind:value={limit} on:change={() => emitUpdate()}>
        {#each limitOptions as o}
            <option value={o}>{o} Items</option>
        {/each}
    </select>

    <div class="btn-group variant-ghost ">
        <button class="btn btn-sm" on:click={previous} disabled={page === 0}>
            <ArrowLeft/>
        </button>
        <button class="btn btn-sm" on:click={reset}>Page {page + 1}</button>
        <button class="btn btn-sm" on:click={next} disabled={count < limit}>
            <ArrowRight/>
        </button>
    </div>

</div>
