<script lang="ts">
    import type { SpellCharges } from "$lib/types/spell-charges";
    import SpellSlotEditorButton from "$lib/components/SpellSlotEditorButton.svelte";

    export let spellCharges: SpellCharges[];
</script>

<div class="flex justify-between">
    {#each spellCharges as slot}
        <SpellSlotEditorButton level={slot.level} charges={slot.charges}/>
    {/each}
</div>
