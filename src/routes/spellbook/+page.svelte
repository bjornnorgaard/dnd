<script lang="ts">
    import { spellbook } from "$lib/stores/spellbook";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import SpellCard from "$lib/components/SpellCard.svelte";
    import { Accordion, AccordionItem } from "@skeletonlabs/skeleton";

    let input = "";

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

    {#each $spellbook as b, bi}
        <PageSection title={`${b.name}'s Spellbook`}>
            <button class="btn btn-sm variant-filled-error" type="button" on:click={() => deleteSpellbook(bi)}>Delete</button>
            <Accordion spacing="space-y-2" regionPanel="variant-soft-surface" regionControl="variant-soft-surface">
                {#each b.spells as s, si}
                    <AccordionItem open>
                        <svelte:fragment slot="summary">
                            <span>{s.level}</span>
                            <span class="text-primary-500 font-bold">{s.name}</span>
                            <span>{`${s.range}, ${s.duration}, ${s.components}, ${s.casting_time}`}</span>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                            <button class="btn btn-sm variant-outline-error" type="button" on:click={() => removeSpell(bi, si)}>Remove</button>
                            <SpellCard spell={s}/>
                        </svelte:fragment>
                    </AccordionItem>
                {/each}
            </Accordion>
        </PageSection>
    {/each}
</PageWrapper>

