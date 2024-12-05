<script lang="ts">
    import { convertAttributeScoreToModifier } from "$lib/utils/modifiers";

    interface Props {
        label: string;
        value: number;
    }

    let { label, value }: Props = $props();

</script>

<div class="flex w-full flex-col gap-1 text-center">
    <div class="font-bold uppercase tracking-tighter text-primary-500">{label}</div>
    <div>
        <span class="font-light">{value}</span>
        (<span class="font-bold">{convertAttributeScoreToModifier(value)}</span>)
    </div>
</div>
