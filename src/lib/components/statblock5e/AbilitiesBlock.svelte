<script lang="ts">
    import TaperedRule from "$lib/components/statblock5e/TaperedRule.svelte";

    export let str: number = 10;
    export let dex: number = 10;
    export let con: number = 10;
    export let int: number = 10;
    export let wis: number = 10;
    export let cha: number = 10;

    function abilityModifier(abilityScore: number): number {
        return Math.floor((abilityScore - 10) / 2);
    }

    function formattedModifier(abilityModifier: number): string {
        if (abilityModifier >= 0) {
            return '+' + abilityModifier;
        }
        return '–' + Math.abs(abilityModifier);
    }

    function abilityText(abilityScore: number): string {
        return [ String(abilityScore), ' (', formattedModifier(abilityModifier(abilityScore)), ')' ].join('');
    }

</script>

<TaperedRule/>

<table>
    <tr>
        <th>STR</th>
        <th>DEX</th>
        <th>CON</th>
        <th>INT</th>
        <th>WIS</th>
        <th>CHA</th>
    </tr>
    <tr>
        <td>{abilityText(str)}</td>
        <td>{abilityText(dex)}</td>
        <td>{abilityText(con)}</td>
        <td>{abilityText(int)}</td>
        <td>{abilityText(wis)}</td>
        <td>{abilityText(cha)}</td>
    </tr>
</table>

<TaperedRule/>

<style lang="postcss">
    table {
        width: 100%;
        border: 0;
        border-collapse: collapse;
    }

    th, td {
        width: 50px;
        text-align: center;
    }
</style>
