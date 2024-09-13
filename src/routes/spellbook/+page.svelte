<script lang="ts">
    import { spellbook } from "$lib/stores/spellbook";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import { Accordion, AccordionItem, Tab, TabGroup } from "@skeletonlabs/skeleton";
    import { AlertCircle, Search } from "lucide-svelte";
    import { activeSpellbookIndex } from "$lib/stores/activeSpellbookIndex";
    import { DEFAULT_PAGE_SIZE } from "$lib/constants/paging";
    import type { Spell } from "$lib/types/spell";
    import { routes } from "$lib/constants/routes";
    import TableHead from "$lib/components/TableHead.svelte";
    import Table from "$lib/components/Table.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import { slide } from "svelte/transition";
    import { cubicInOut } from "svelte/easing";

    let ownerInput = "";
    let searchInput = "";
    let spells: Spell[] = [];

    function createSpellbook() {
        if (!ownerInput) {
            console.log("No input");
            return;
        }

        $spellbook = [ { name: ownerInput, spells: [] }, ...$spellbook ];
        ownerInput = "";
    }

    function deleteSpellbook(index: number) {
        $spellbook = $spellbook.filter((_, i) => i !== index);
    }

    function removeSpell(spellbookIndex: number, spellIndex: number) {
        $spellbook[spellbookIndex].spells = $spellbook[spellbookIndex].spells.filter((_, i) => i !== spellIndex);
    }

    async function searchSpells() {
        let query = searchInput.trim();
        spells = await fetch(routes.api_spells(query, DEFAULT_PAGE_SIZE, 0)).then(r => r.json());
    }

    function addSpell(spell: Spell) {
        $spellbook[$activeSpellbookIndex].spells = [ ...$spellbook[$activeSpellbookIndex].spells, spell ];
        sortSpellbook($activeSpellbookIndex);
        spells = [];
        searchInput = "";
    }

    function sortSpellbook(index: number) {
        $spellbook[index].spells = $spellbook[index].spells.sort((a, b) => a.level_int - b.level_int);
    }

    async function searchKeydown(e: KeyboardEvent) {
        if (!searchInput) {
            spells = [];
            return;
        }

        if (e.key === "Enter") {
            addSpell(spells[0]);
            return;
        }

        await searchSpells();
    }

</script>

<PageWrapper title="Spellbook" desc="Manage your spells">
    <form on:submit|preventDefault={() => createSpellbook()} class="flex gap-4">
        <label for="input" class="w-full label">
            <span>Who's spellbook will this be?</span>
            <div class="flex w-full gap-4">
                <input id="input" type="text" class="input" autocomplete="off" bind:value={ownerInput} placeholder="What should we call this spellbook?">
                <button class="btn variant-filled-primary" type="button" disabled={!ownerInput} on:click={() => createSpellbook()}>
                    {#if ownerInput.length >= 2}
                        Create {ownerInput}'s spellbook
                    {:else}
                        Create
                    {/if}
                </button>
            </div>
        </label>
    </form>

    {#if $spellbook.length === 0}
        <aside class="flex flex-col alert variant-ghost-warning">
            <div class="flex items-center gap-4">
                <AlertCircle/>
                <h3 class="h3">No spellbooks yet...</h3>
            </div>
            <div class="alert-message">
                <p>Use the input above to create your first spellbook.</p>
            </div>
        </aside>
    {:else}
        <TabGroup active="border-b-2 border-surface-500">
            {#each $spellbook as b, bi}
                <Tab bind:group={$activeSpellbookIndex} name={b.name} value={bi}>
                    <h2 class="h2"
                        class:font-bold={$activeSpellbookIndex === bi}
                        class:text-surface-500={$activeSpellbookIndex !== bi}
                        class:text-primary-500={$activeSpellbookIndex === bi}>
                        {b.name}
                    </h2>
                </Tab>
            {/each}
            <svelte:fragment slot="panel">
                <Accordion spacing="space-y-2" regionPanel="variant-soft-surface" regionControl="variant-soft-surface">
                    <div class="p-4 card variant-soft-surface">

                        <p>Search and add spells to {$spellbook[$activeSpellbookIndex].name}'s spellbook</p>
                        <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
                            <div class="input-group-shim">
                                <Search/>
                            </div>
                            <input type="search" placeholder="Search..." bind:value={searchInput} on:keydown={(e) => {searchKeydown(e)}}/>
                        </div>
                    </div>

                    {#if spells.length}
                        <Table>
                            <TableHead>
                                <th class="">Level</th>
                                <th>Name</th>
                                <th class="">School</th>
                                <th>Duration</th>
                            </TableHead>
                            <TableBody>
                                {#each spells as s}
                                    <tr role="button" on:click={() => addSpell(s)}>
                                        <td class="">{s.spell_level}</td>
                                        <td class="anchor">
                                            <a href={routes.spells_slug(s.slug)}>
                                                {s.name}
                                            </a>
                                        </td>
                                        <td class="">{s.school}</td>
                                        <td>{s.duration}</td>
                                    </tr>
                                {/each}
                            </TableBody>
                        </Table>
                    {/if}

                    {#if !spells.length}
                        {#each $spellbook[$activeSpellbookIndex].spells as s, si (s.slug)}
                            <div in:slide={{axis: 'y', easing: cubicInOut, delay: 200, duration: 200}} out:slide={{axis: 'y',  easing: cubicInOut, duration: 200}}>
                                <AccordionItem>
                                    <svelte:fragment slot="summary">
                                        <div class="flex justify-between gap-4">
                                            <div class="flex gap-4">
                                                <span class="badge variant-outline">{s.level}</span>
                                                <span class="font-bold text-primary-500">{s.name}</span>
                                            </div>
                                            <div class="flex gap-2">
                                                {#if s.can_be_cast_as_ritual}
                                                    <span class="badge variant-outline-primary">{s.can_be_cast_as_ritual ? "Ritual" : ""}</span>
                                                {/if}
                                                {#if s.casting_time !== "1 action"}
                                                    <span class="badge variant-outline-secondary">{s.casting_time.slice(0, 10)}</span>
                                                {/if}
                                                {#if s.range.toLowerCase() !== "self"}
                                                    <span class="hidden badge variant-outline-tertiary sm:block">{s.range}</span>
                                                {/if}
                                                {#if s.duration.toLowerCase() !== "instantaneous"}
                                                    <span class="hidden badge variant-outline-success sm:block">{s.duration}</span>
                                                {/if}
                                                <span class="hidden badge variant-outline-surface md:block">{s.components}</span>
                                            </div>
                                        </div>
                                    </svelte:fragment>
                                    <svelte:fragment slot="content">
                                        <div class="relative">
                                            <button class="absolute top-0 right-0 btn btn-sm variant-soft-error hover:variant-filled-error" on:click={() => removeSpell($activeSpellbookIndex, si)}>
                                                Remove {s.name}
                                            </button>
                                            <p><b>School</b> {s.level} {s.school.toLowerCase()} {s.can_be_cast_as_ritual ? "(ritual)" : ""}</p>
                                            <p><b>Casting Time</b> {s.casting_time}</p>
                                            <p><b>Range</b> {s.range}</p>
                                            <p><b>Components</b> {s.components}</p>
                                            {#if s.requires_material_components}
                                                <p><b>Materials</b> {s.material}</p>
                                            {/if}
                                            <p>
                                                <b>Duration</b>
                                                {s.requires_concentration ? "Concentration," : ""}
                                                {s.duration.toLowerCase()}
                                            </p>
                                        </div>
                                        <p class="pt-2 indent-4">{s.desc}</p>
                                        {#if s.higher_level}
                                            <p class="pt-2"><b>At Higher Levels</b> {s.higher_level}</p>
                                        {/if}
                                    </svelte:fragment>
                                </AccordionItem>
                            </div>
                        {/each}
                        <br>
                        <div class="flex">
                            <button class="w-full btn variant-soft-error hover:variant-filled-error" type="button" on:click={() => deleteSpellbook($activeSpellbookIndex)}>Delete {$spellbook[$activeSpellbookIndex].name}'s Spellbook</button>
                        </div>
                    {/if}
                </Accordion>
            </svelte:fragment>
        </TabGroup>
    {/if}
</PageWrapper>

