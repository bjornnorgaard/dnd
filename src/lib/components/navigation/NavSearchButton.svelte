<script lang="ts">
    import { AppRailAnchor } from "@skeletonlabs/skeleton";
    import { Search } from "lucide-svelte";
    import { globalSearch } from "$lib/stores/global-search.js";

    function search() {
        globalSearch.open();
    }
</script>

<AppRailAnchor class="cursor-pointer" on:click={() => search()}>
    {#snippet lead()}
    
            <Search/>
        
    {/snippet}
    <kbd class="kbd">⌘+K</kbd>
</AppRailAnchor>
