<script lang="ts">
    import { mapAttributeToModifier } from "$lib/utils/modifiers";

    export let label: string;
    export let value: number;

</script>

<div class="flex w-full flex-col gap-1 text-center">
    <div class="font-bold uppercase tracking-tighter text-primary-500">{label}</div>
    <div>
        <span class="font-light">{value}</span>
        (<span class="font-bold">{mapAttributeToModifier(value)}</span>)
    </div>
</div>
