<script>
    import Statblock from "$lib/components/statblock5e/Statblock.svelte";
    import CreatureHeading from "$lib/components/statblock5e/CreatureHeading.svelte";
    import TopStats from "$lib/components/statblock5e/TopStats.svelte";
    import PropertyLine from "$lib/components/statblock5e/PropertyLine.svelte";
    import PropertyBlock from "$lib/components/statblock5e/PropertyBlock.svelte";
    import AbilitiesBlock from "$lib/components/statblock5e/AbilitiesBlock.svelte";
    import SectionHeading from "$lib/components/statblock5e/SectionHeading.svelte";
</script>

<div class="p-10 bg-white">


    <div class="w-[400px]">

        <Statblock>
            <CreatureHeading>
                <svelte:fragment slot="title">Animated Armor</svelte:fragment>
                <svelte:fragment slot="subtitle">Medium construct, unaligned</svelte:fragment>
            </CreatureHeading>

            <TopStats>
                <PropertyLine>
                    <svelte:fragment slot="title">Armor Class</svelte:fragment>
                    <svelte:fragment slot="desc">18 (natural armor)</svelte:fragment>
                </PropertyLine>
                <PropertyLine>
                    <svelte:fragment slot="title">Hit Points</svelte:fragment>
                    <svelte:fragment slot="desc">33 (6d8 + 6)</svelte:fragment>
                </PropertyLine>
                <PropertyLine>
                    <svelte:fragment slot="title">Speed</svelte:fragment>
                    <svelte:fragment slot="desc">25ft</svelte:fragment>
                </PropertyLine>

                <AbilitiesBlock str={14} dex={11} con={13} int={1} wis={3} cha={1}/>

                <PropertyLine>
                    <svelte:fragment slot="title">Damage Immunities</svelte:fragment>
                    <svelte:fragment slot="desc">poison, psychic</svelte:fragment>
                </PropertyLine>
                <PropertyLine>
                    <svelte:fragment slot="title">Condition Immunities</svelte:fragment>
                    <svelte:fragment slot="desc">blinded, charmed, deafened, exhaustion, frightened, paralyzed, petrified, poisoned</svelte:fragment>
                </PropertyLine>
                <PropertyLine>
                    <svelte:fragment slot="title">Senses</svelte:fragment>
                    <svelte:fragment slot="desc">blindsight 60 ft. (blind beyond this radius), passive Perception&nbsp6
                    </svelte:fragment>
                </PropertyLine>
                <PropertyLine>
                    <svelte:fragment slot="title">Languages</svelte:fragment>
                    <svelte:fragment slot="desc">—</svelte:fragment>
                </PropertyLine>
                <PropertyLine>
                    <svelte:fragment slot="title">Challenge</svelte:fragment>
                    <svelte:fragment slot="desc">1 (200 XP)</svelte:fragment>
                </PropertyLine>
            </TopStats>

            <PropertyBlock>
                <svelte:fragment slot="title">Antimagic Susceptibility.</svelte:fragment>
                <svelte:fragment slot="desc">
                    The armor is incapacitated while in the area of an <i>antimagic field</i>.
                    If targeted by <i>dispel magic</i>, the armor must succeed on a Constitution
                    saving throw against the caster’s spell save DC or fall unconscious for 1 minute.
                </svelte:fragment>
            </PropertyBlock>
            <PropertyBlock>
                <svelte:fragment slot="title">False Appearance.</svelte:fragment>
                <svelte:fragment slot="desc">
                    While the armor remains motionless, it is indistinguishable from a normal suit of armor.
                </svelte:fragment>
            </PropertyBlock>

            <SectionHeading>Actions</SectionHeading>

            <PropertyBlock>
                <svelte:fragment slot="title">Multiattack.</svelte:fragment>
                <svelte:fragment slot="desc">The armor makes two melee attacks.</svelte:fragment>
            </PropertyBlock>

            <PropertyBlock>
                <svelte:fragment slot="title">Slam.</svelte:fragment>
                <svelte:fragment slot="desc">
                    <i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                    <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.
                </svelte:fragment>
            </PropertyBlock>
        </Statblock>

    </div>

</div>
