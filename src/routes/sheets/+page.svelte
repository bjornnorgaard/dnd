<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PlayersTable from "$lib/components/PlayersTable.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
</script>

<PageWrapper title="Sheets">
    <PageSection title="Characters">
        <PlayersTable/>
    </PageSection>
</PageWrapper>
