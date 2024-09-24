<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import PageLink from "$lib/components/PageLink.svelte";
    import RolePicker from "$lib/components/RolePicker.svelte";
    import { browser } from "$app/environment";
    import { Role, settings } from "$lib/stores/settings";
</script>

<PageWrapper title="D&D by Bear" desc="Collection of tools for both players and runners of D&D 5th Edition games">
    {#if browser && $settings?.role === Role.None}
        <PageSection title="Who do you want to be?">
            <p>This will help me present tools relevant to you. You can change it anytime from the
                <PageLink href="/settings"/>
               page.
            </p>
            <RolePicker/>
        </PageSection>
    {/if}
</PageWrapper>
