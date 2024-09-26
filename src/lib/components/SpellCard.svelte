<script lang="ts">
    import type { Spell } from "$lib/types/spell";
    import { CircleX } from "lucide-svelte";
    import { createEventDispatcher } from "svelte";

    export let spell: Spell;

    const dispatcher = createEventDispatcher();

    function crossClicked() {
        dispatcher("remove", spell);
    }
</script>

<div>
    <div class="flex items-center w-full justify-between">
        <p><b class="text-lg text-primary-500">{spell.name}</b></p>
        <button class="btn-icon btn-icon-sm hover:text-error-500" on:click={() => crossClicked()}>
            <CircleX/>
        </button>
    </div>
    <p class="pb-2 italic">{spell.level} {spell.school.toLowerCase()} {spell.can_be_cast_as_ritual ? "(ritual)" : ""}</p>
    <p><b>Casting Time</b> {spell.casting_time}</p>
    <p><b>Range</b> {spell.range}</p>
    <p><b>Components</b> {spell.components}</p>
    {#if spell.requires_material_components}
        <p><b>Materials</b> {spell.material}</p>
    {/if}
    <p><b>Duration</b>
        {spell.requires_concentration ? "Concentration," : ""}
        {spell.duration.toLowerCase()}
    </p>

    <p class="pt-2 indent-4">{spell.desc}</p>

    {#if spell.higher_level}
        <p class="pt-2"><b>At Higher Levels</b> {spell.higher_level}</p>
    {/if}
</div>
