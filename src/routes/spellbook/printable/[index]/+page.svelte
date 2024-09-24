<script lang="ts">
    import { spellbookStore } from "$lib/stores/spellbookStore";
    import PrintablePage from "../PrintablePage.svelte";

    export let data;
    let spellbook = $spellbookStore[data?.index];
</script>

<PrintablePage title={`${spellbook.name}'s Spellbook`}>
    <div class="print:m-0 print:p-0 screen:p-4 space-y-4">
        {#if !spellbook}
            <aside class="alert variant-filled-error">
                <div class="alert-message">
                    <h3 class="h3">Someone done goofed</h3>
                    <p>Spellbook with index {data.index} not found</p>
                </div>
            </aside>
        {/if}

        {#if spellbook}
            <ol class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {#each spellbook.spells as s}
                    <li class="break-inside-avoid-page rounded-2xl p-4 space-y-4"
                        class:col-span-2={s.desc.length > 500}
                        class:col-span-full={s.desc.length > 1000}>
                        <div>
                            <p class="text-2xl font-bold">{s.name}</p>
                            {#if s.level_int === 0}
                                <p>{s.school} cantrip</p>
                            {:else}
                                <p>{s.level} {s.school.toLowerCase()}</p>
                            {/if}
                        </div>

                        <div>
                            <p><b>Casting Time:</b> {s.casting_time}</p>
                            <p><b>Range:</b> {s.range}</p>
                            <p><b>Components:</b> {s.components}</p>
                            {#if s.requires_material_components}
                                <p><b>Material:</b> {s.material}</p>
                            {/if}
                            {#if s.requires_concentration}
                                <p><b>Duration:</b> Concentration, {s.duration.toLowerCase()}</p>
                            {:else if s.duration.toLowerCase() === "instantaneous"}
                                <p><b>Duration:</b> Instant</p>
                            {:else}
                                <p><b>Duration</b> {s.duration}</p>
                            {/if}

                            {#if s.can_be_cast_as_ritual}
                                <p><b>Ritual:</b></p>
                            {/if}
                        </div>

                        <div>
                            <p>{s.desc}</p>
                        </div>

                        {#if s.higher_level}
                            <div>
                                <br>
                                <p><b>At higher levels:</b> {s.higher_level}</p>
                            </div>
                        {/if}
                    </li>
                {/each}
            </ol>
        {/if}
    </div>
</PrintablePage>
