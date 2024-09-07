<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import RolePicker from "$lib/components/RolePicker.svelte";
    import { settings } from "$lib/stores/settings";
    import PageSection from "$lib/components/PageSection.svelte";
</script>

<PageWrapper title="Settings" desc="How the app works and stuff.">
    <PageSection title="Raw View" desc="The raw JSON is stored in your browser.">
        <pre class="pre">{JSON.stringify($settings, null, 2)}</pre>
    </PageSection>

    <PageSection title="Who do you want to be?">
        <p>This will help me present tools relevant to you.</p>
        <RolePicker/>
    </PageSection>
</PageWrapper>
