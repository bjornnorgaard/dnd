<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { writable } from "svelte/store";
    import PageSection from "$lib/components/PageSection.svelte";

    let query = "";
    let results = writable<any>([]);

    async function search() {
        if (!query.length) return;
        const res = await fetch(`/api/search/v2?query=${query}`).then(r => r.json());
        $results = res.map((r: string) => ({ label: r, value: r }));
    }
</script>

<PageWrapper title="Search" desc="Filter everything and maybe find something">
    <label class="label">
        <span>Title</span>
        <input type="search" class="input" bind:value={query} on:input={search} placeholder="Search Title">
    </label>

    <PageSection title="Results">
        <pre>{JSON.stringify($results, null, 2)}</pre>
    </PageSection>
</PageWrapper>
