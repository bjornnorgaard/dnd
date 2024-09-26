<script lang="ts">
    import { spellbookStore } from "$lib/stores/spellbookStore";
    import PrintablePage from "../PrintablePage.svelte";
    import type { Spell } from "$lib/types/spell";
    import { onMount } from "svelte";

    export let data;
    let spellbook = $spellbookStore[data?.index];
    let spells: Spell[][] = [];

    onMount(() => {
        for (let spellIndex in spellbook.spells) {
            const level = spellbook.spells[spellIndex].level_int;
            if (!spells[level]) {
                spells[level] = [];
            }

            spells[level].push(spellbook.spells[spellIndex]);
        }
    });

</script>

<PrintablePage title={`${spellbook.owner}'s Spellbook`}>
    <div class="space-y-4">
        {#if !spellbook}
            <aside class="alert variant-filled-error">
                <div class="alert-message">
                    <h3 class="h3">Someone done goofed</h3>
                    <p>Spellbook with index {data.index} not found</p>
                </div>
            </aside>
        {/if}

        {#if spellbook}
            {#each spellbook.spells as s}
                <div class="break-inside-avoid-page">
                    <div>
                        <p class="text-2xl font-bold">{s.name}</p>
                        {#if s.level_int === 0}
                            {s.school} cantrip
                        {:else}
                            {s.level} {s.school.toLowerCase()}
                        {/if}
                        {#if s.can_be_cast_as_ritual} ritual{/if}
                    </div>

                    <div>
                        <p><b>Casting Time:</b> {s.casting_time}</p>
                        <p><b>Range:</b> {s.range}</p>
                        <p><b>Components:</b> {s.components}</p>
                        {#if s.requires_material_components && s.material.length}
                            <p><b>Material:</b> {s.material}</p>
                        {/if}
                        {#if s.requires_concentration}
                            <p><b>Duration:</b> Concentration, {s.duration.toLowerCase()}</p>
                        {:else if s.duration.toLowerCase() === "instantaneous"}
                            <p><b>Duration:</b> Instant</p>
                        {:else}
                            <p><b>Duration</b> {s.duration}</p>
                        {/if}
                    </div>

                    <p>{s.desc}</p>

                    {#if s.higher_level}
                        <p><b>At higher levels:</b> {s.higher_level}</p>
                    {/if}

                </div>
            {/each}
        {/if}
    </div>
</PrintablePage>
