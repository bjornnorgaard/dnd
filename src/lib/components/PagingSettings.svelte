<script lang="ts">
    import { ArrowLeft, ArrowRight } from "lucide-svelte";

    let { count = $bindable(), update } = $props();
    let limitOptions = [ 5, 10, 20, 50 ];
    let page = $state(0);
    let limit = $state(10);

    function emitUpdate(): void {
        const offset = Math.max(0, page * limit);
        update({ offset: offset, limit: limit });
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

    <select class="w-fit select" bind:value={limit} onchange={() => emitUpdate}>
        {#each limitOptions as o}
            <option value={o}>{o} Items</option>
        {/each}
    </select>

    <div class="btn-group variant-ghost ">
        <button class="btn btn-sm" onclick={previous} disabled={page === 0}>
            <ArrowLeft/>
        </button>
        <button class="btn btn-sm" onclick={reset}>Page {page + 1}</button>
        <button class="btn btn-sm" onclick={next} disabled={count < limit}>
            <ArrowRight/>
        </button>
    </div>

</div>
