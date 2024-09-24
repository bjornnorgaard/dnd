<script lang="ts">
    import CreatureStatAttribute from "$lib/components/StatblockAttribute.svelte";
    import { appendSign } from "$lib/utils/positive-sign";
    import StatblockSection from "$lib/components/StatblockSection.svelte";
    import StatblockDivider from "$lib/components/StatblockDivider.svelte";
    import { fetchSpells } from "$lib/utils/fetch-spells";
    import { ProgressBar } from "@skeletonlabs/skeleton";
    import SpellCard from "$lib/components/SpellCard.svelte";
    import type { Creature } from "$lib/types/creature";

    export let creature: Creature | null = null;
</script>

{#if creature}
    {@const c = creature}
    <div class="p-4 text-sm card">
        <div class="flex justify-between">
            <h3 class="font-bold grow h3 text-primary-500">{c.name}</h3>
        </div>

        <p>
            {#if c.size}{c.size},{/if}
            {#if c.type}{c.type},{/if}
            <!--{#if c.subtype}{c.subtype},{/if}-->
            {#if c.group}{c.group},{/if}
            {#if c.alignment}{c.alignment}{/if}
        </p>

        <StatblockDivider/>

        <p><b>Armor Class</b>
            {c.armor_class}
            {#if c.armor_desc}
                ({c.armor_desc})
            {/if}
        </p>
        <p><b>Hit Points</b>
            {c.hit_points}
            {#if c.hit_dice}
                ({c.hit_dice})
            {/if}
        </p>

        {#if Object.keys(c.speed).length > 0}
            <p><b>Speed</b>
                {#each Object.keys(c.speed) as key, i}
                    {#if c.speed[key]}
                        {#if i !== 0},{/if}
                        {key} {c.speed[key]} ft.
                    {/if}
                {/each}
            </p>
        {/if}

        <StatblockDivider/>

        <div class="flex justify-between py-1">
            <CreatureStatAttribute label="str" value={c.strength}/>
            <CreatureStatAttribute label="dex" value={c.dexterity}/>
            <CreatureStatAttribute label="con" value={c.constitution}/>
            <CreatureStatAttribute label="int" value={c.intelligence}/>
            <CreatureStatAttribute label="wis" value={c.wisdom}/>
            <CreatureStatAttribute label="cha" value={c.charisma}/>
        </div>

        <StatblockDivider/>

        {#if c.strength_save || c.dexterity_save || c.constitution_save || c.intelligence_save || c.wisdom_save || c.charisma_save}
            <p>
                <b>Saving Throws</b>
                {#if c.strength_save}
                    <span>Str {appendSign(c.strength_save)}</span>,
                {/if}
                {#if c.dexterity_save}
                    <span>Dex {appendSign(c.dexterity_save)}</span>,
                {/if}
                {#if c.constitution_save}
                    <span>Con {appendSign(c.constitution_save)}</span>,
                {/if}
                {#if c.intelligence_save}
                    <span>Int {appendSign(c.intelligence_save)}</span>,
                {/if}
                {#if c.wisdom_save}
                    <span>Wis {appendSign(c.wisdom_save)}</span>,
                {/if}
                {#if c.charisma_save}
                    <span>Cha {appendSign(c.charisma_save)}</span>
                {/if}
            </p>
        {/if}

        {#if Object.keys(c.skills).length > 0}
            <b>Skills</b>
            {#each Object.keys(c.skills) as skill, i}
                {#if c.skills[skill]}
                    {#if i !== 0},{/if}
                    {skill} {appendSign(c.skills[skill])}
                {/if}
            {/each}
        {/if}

        {#if c.damage_vulnerabilities}
            <p>
                <b>Damage Vulnerabilities</b>
                <span>{c.damage_vulnerabilities}</span>
            </p>
        {/if}
        {#if c.damage_immunities}
            <p>
                <b>Damage Immunities</b>
                <span>{c.damage_immunities}</span>
            </p>
        {/if}
        {#if c.condition_immunities}
            <p>
                <b>Condition Immunities</b>
                <span>{c.condition_immunities}</span>
            </p>
        {/if}
        {#if c.damage_resistances}
            <p>
                <b>Damage Resistances</b>
                <span>{c.damage_resistances}</span>
            </p>
        {/if}
        {#if c.senses}
            <p>
                <b>Senses</b>
                <span>{c.senses}</span>
            </p>
        {/if}
        {#if c.languages}
            <p>
                <b>Languages</b>
                <span>{c.languages}</span>
            </p>
        {/if}
        {#if c.challenge_rating}
            <p>
                <b>Challenge</b>
                <span>{c.challenge_rating}</span>
            </p>
        {/if}

        {#if c.damage_vulnerabilities || c.damage_immunities || c.condition_immunities || c.damage_resistances || c.senses || c.languages || c.challenge_rating}
            <StatblockDivider/>
        {/if}

        {#if c.special_abilities}
            <div class="pt-2 space-y-4">
                {#each c.special_abilities as ability}
                    <p><b>{ability.name}</b> {ability.desc}</p>
                {/each}
            </div>
        {/if}

        <StatblockSection title="Reactions" condition={!!c.reactions?.length}>
            {#each c.reactions as reaction}
                <p><b>{reaction.name}</b> {reaction.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Actions" condition={!!c.actions?.length}>
            {#each c.actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Bonus Actions" condition={!!c.bonus_actions?.length}>
            {#each c.bonus_actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Legendary Actions" condition={!!c.legendary_actions?.length}>
            <p>{c.legendary_desc}</p>
            {#each c.legendary_actions as action}
                <p><b>{action.name}</b> {action.desc}</p>
            {/each}
        </StatblockSection>

        <StatblockSection title="Spells" condition={!!c.spell_list?.length}>
            {#each c.spell_list as url}
                {#await fetchSpells(url)}
                    <p class="py-2">
                        <ProgressBar value={undefined}/>
                    </p>
                {:then s}
                    <SpellCard spell={s}/>
                {:catch error}
                    <p>Error: {error}</p>
                {/await}
            {/each}
        </StatblockSection>
    </div>
{/if}
