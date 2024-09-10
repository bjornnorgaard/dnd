<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import PageLink from "$lib/components/PageLink.svelte";
    import RolePicker from "$lib/components/RolePicker.svelte";
    import { browser } from "$app/environment";
    import { Role, settings } from "$lib/stores/settings";
    import { routes } from "$lib/constants/routes";
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
    {:else}
        <PageSection title="Features to Try">
            <p>Collection of tools for both players and runners of D&D 5th Edition games.</p>
            <div class="grid gap-4 my-4 sm:grid-cols-2 md:grid-cols-3">
                {#if $settings.role === Role.Dm}
                    <a class="btn variant-ghost-secondary" href={routes.beasts()}>Search Beasts</a>
                    <a class="btn variant-ghost-secondary" href={routes.combat()}>Create Encounters</a>
                {/if}
                <a class="btn variant-ghost-secondary" href={routes.spells()}>Search Spells</a>
                <a class="btn variant-ghost-secondary" href={routes.settings()}>Change Settings</a>
            </div>
        </PageSection>
    {/if}
</PageWrapper>
