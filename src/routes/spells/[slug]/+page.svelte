<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";
    import StatblockDivider from "$lib/components/statblock/StatblockDivider.svelte";

    export let data;
</script>

<PageWrapper title={data.spell.name} desc={`${data.spell.level} ${data.spell.school.toLowerCase()} ${data.spell.can_be_cast_as_ritual ? "(ritual)" : ""}`}>
    <div>
        <StatblockDivider/>
        <p><b>Casting Time</b> {data.spell.casting_time}</p>
        <p><b>Range</b> {data.spell.range}</p>
        <p><b>Components</b> {data.spell.components}</p>
        {#if data.spell.requires_material_components && data.spell.material}
            <p><b>Materials</b> {data.spell.material}</p>
        {/if}
        <p><b>Duration</b>
            {data.spell.requires_concentration ? "Concentration," : ""}
            {data.spell.duration.toLowerCase()}
        </p>
        <StatblockDivider/>

        <br>
        <p class="pt-2 indent-4">{@html data.spell.desc.toString().replaceAll("\n", "<br>")}</p>

        {#if data.spell.higher_level}
            <br>
            <p class="indent-4 pt-2"><b>At Higher Levels</b> {data.spell.higher_level}</p>
        {/if}
    </div>

    <Accordion>
        <AccordionItem>
            <svelte:fragment slot="summary">Debug</svelte:fragment>
            <svelte:fragment slot="content">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </svelte:fragment>
        </AccordionItem>
    </Accordion>
</PageWrapper>
