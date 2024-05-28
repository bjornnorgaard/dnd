<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";

    export let data;
</script>

<PageWrapper title="Spellbook">
    <PageSection title={data.id}>

    </PageSection>
</PageWrapper>
