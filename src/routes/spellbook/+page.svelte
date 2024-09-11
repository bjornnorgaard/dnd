<script lang="ts">
    import { spellbook } from "$lib/stores/spellbook";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { Accordion, AccordionItem, Tab, TabGroup } from "@skeletonlabs/skeleton";

    let input = "";
    let tabIndex: number = 0;

    function createSpellbook() {
        if (!input) {
            console.log("No input");
            return;
        }

        $spellbook = [ { name: input, spells: [] }, ...$spellbook ];
        input = "";
    }

    function deleteSpellbook(index: number) {
        $spellbook = $spellbook.filter((_, i) => i !== index);
    }

    function removeSpell(spellbookIndex: number, spellIndex: number) {
        $spellbook[spellbookIndex].spells = $spellbook[spellbookIndex].spells.filter((_, i) => i !== spellIndex);
    }
</script>

<PageWrapper title="Spellbook" desc="Manage your spells">
    <label for="input" class="label">
        <span>Create a new spellbook</span>
        <div class="flex gap-4">
            <input id="input" type="text" class="input" autocomplete="off" bind:value={input} on:submit={() => createSpellbook()} placeholder="What should we call this spellbook?">
            <button class="btn variant-filled-primary" type="button" on:click={() => createSpellbook()}>Create</button>
        </div>
    </label>

    <PageSection title="Your Spellbooks">

        <TabGroup>
            {#each $spellbook as b, bi}
                <Tab bind:group={tabIndex} name={b.name} value={bi}>
                    <h2 class="h2"
                        class:font-bold={tabIndex === bi}
                        class:text-primary-500={tabIndex === bi}
                    >
                        {b.name}</h2>
                </Tab>
            {/each}
            <svelte:fragment slot="panel">
                <Accordion spacing="space-y-2" regionPanel="variant-soft-surface" regionControl="variant-soft-surface" autocollapse>
                    {#each $spellbook[tabIndex].spells as s, si}
                        <AccordionItem open>
                            <svelte:fragment slot="summary">
                                <div class="flex justify-between gap-4">
                                    <div class="flex gap-4">
                                        <span class="badge variant-outline">{s.level}</span>
                                        <span class="font-bold text-primary-500">{s.name}</span>
                                    </div>
                                    <div class="flex gap-2">
                                        <span class="badge variant-outline-secondary">{s.casting_time.slice(0, 10)}</span>
                                        <span class="badge variant-outline-tertiary">{s.range}</span>
                                        <span class="badge variant-outline-warning">{s.components}</span>
                                        <span class="badge variant-outline-surface">{s.duration}</span>
                                    </div>
                                </div>
                            </svelte:fragment>
                            <svelte:fragment slot="content">
                                <div class="flex w-full items-center justify-between">
                                    <!--                                <p><b class="text-lg text-primary-500">{s.name}</b></p>-->
                                </div>
                                <!--                            <p class="pb-2 italic">{s.level} {s.school.toLowerCase()} {s.can_be_cast_as_ritual ? "(ritual)" : ""}</p>-->
                                <p><b>Casting Time</b> {s.casting_time}</p>
                                <p><b>Range</b> {s.range}</p>
                                <p><b>Components</b> {s.components}</p>
                                {#if s.requires_material_components}
                                    <p><b>Materials</b> {s.material}</p>
                                {/if}
                                <p><b>Duration</b>
                                    {s.requires_concentration ? "Concentration," : ""}
                                    {s.duration.toLowerCase()}
                                </p>

                                <p class="pt-2 indent-4">{s.desc}</p>

                                {#if s.higher_level}
                                    <p class="pt-2"><b>At Higher Levels</b> {s.higher_level}</p>
                                {/if}
                                <div class="mt-4 flex justify-end">
                                    <button class="btn btn-sm variant-ghost-error" on:click={() => removeSpell(tabIndex, si)}>remove from spellbook</button>
                                </div>
                            </svelte:fragment>
                        </AccordionItem>
                    {/each}
                </Accordion>
                <div class="mt-4">
                    <button class="btn btn-sm variant-filled-error" type="button" on:click={() => deleteSpellbook(tabIndex)}>Delete {$spellbook[tabIndex].name}'s Spellbook</button>
                </div>
            </svelte:fragment>
        </TabGroup>
    </PageSection>

    <!--{#each $spellbook as b, bi}-->
    <!--    <PageSection title={`${b.name}'s Spellbook`}>-->
    <!--        <button class="btn btn-sm variant-filled-error" type="button" on:click={() => deleteSpellbook(bi)}>Delete</button>-->
    <!--        <Accordion spacing="space-y-2" regionPanel="variant-soft-surface" regionControl="variant-soft-surface" autocollapse>-->
    <!--            {#each b.spells as s, si}-->
    <!--                <AccordionItem open>-->
    <!--                    <svelte:fragment slot="summary">-->
    <!--                        <div class="flex justify-between gap-4">-->
    <!--                            <div class="flex gap-4">-->
    <!--                                <span class="badge variant-outline">{s.level}</span>-->
    <!--                                <span class="font-bold text-primary-500">{s.name}</span>-->
    <!--                            </div>-->
    <!--                            <div class="flex gap-2">-->
    <!--                                <span class="badge variant-outline-secondary">{s.casting_time.slice(0, 10)}</span>-->
    <!--                                <span class="badge variant-outline-tertiary">{s.range}</span>-->
    <!--                                <span class="badge variant-outline-warning">{s.components}</span>-->
    <!--                                <span class="badge variant-outline-surface">{s.duration}</span>-->
    <!--                            </div>-->
    <!--                        </div>-->
    <!--                    </svelte:fragment>-->
    <!--                    <svelte:fragment slot="content">-->
    <!--                        <div class="flex w-full items-center justify-between">-->
    <!--                            &lt;!&ndash;                                <p><b class="text-lg text-primary-500">{s.name}</b></p>&ndash;&gt;-->
    <!--                        </div>-->
    <!--                        &lt;!&ndash;                            <p class="pb-2 italic">{s.level} {s.school.toLowerCase()} {s.can_be_cast_as_ritual ? "(ritual)" : ""}</p>&ndash;&gt;-->
    <!--                        <p><b>Casting Time</b> {s.casting_time}</p>-->
    <!--                        <p><b>Range</b> {s.range}</p>-->
    <!--                        <p><b>Components</b> {s.components}</p>-->
    <!--                        {#if s.requires_material_components}-->
    <!--                            <p><b>Materials</b> {s.material}</p>-->
    <!--                        {/if}-->
    <!--                        <p><b>Duration</b>-->
    <!--                            {s.requires_concentration ? "Concentration," : ""}-->
    <!--                            {s.duration.toLowerCase()}-->
    <!--                        </p>-->

    <!--                        <p class="pt-2 indent-4">{s.desc}</p>-->

    <!--                        {#if s.higher_level}-->
    <!--                            <p class="pt-2"><b>At Higher Levels</b> {s.higher_level}</p>-->
    <!--                        {/if}-->
    <!--                        <div class="mt-4 flex justify-end">-->
    <!--                            <button class="btn btn-sm variant-ghost-error" on:click={() => removeSpell(bi, si)}>Remove From Spellbook</button>-->
    <!--                        </div>-->
    <!--                    </svelte:fragment>-->
    <!--                </AccordionItem>-->
    <!--            {/each}-->
    <!--        </Accordion>-->
    <!--    </PageSection>-->
    <!--{/each}-->
</PageWrapper>

