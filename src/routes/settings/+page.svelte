<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { SlideToggle } from "@skeletonlabs/skeleton";
    import { settings } from "$lib/stores/settings.js";
</script>

<PageWrapper title="Settings" desc="Changes take effect after a page reload">
    <PageSection title="DM Settings">
        <div class="flex flex-col gap-4">
            <SlideToggle name="slide" active="bg-primary-500" bind:checked={$settings.showCombatRoute}>
                Show Combat Section
            </SlideToggle>
        </div>
    </PageSection>
    <PageSection title="Player Settings">
        <div class="flex flex-col gap-4">
            <SlideToggle name="slide" active="bg-primary-500" bind:checked={$settings.showSheetsRoute}>
                Show Character Sheets
            </SlideToggle>
        </div>
    </PageSection>
</PageWrapper>
