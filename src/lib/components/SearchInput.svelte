<script lang="ts">
    import { Search } from "lucide-svelte";

    let { label, input } = $props();

    let query: string = $state("");

    function emitUpdate() {
        input(query);
    }
</script>

<div class="label">
    <span>{label}</span>
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="flex gap-2 input-group-shim">
            <Search/>
        </div>

        <input type="search"
               placeholder="Search..."
               bind:value={query}
               oninput={() => emitUpdate()}/>
    </div>
</div>
