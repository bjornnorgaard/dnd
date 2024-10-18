<script>
    import Statblock from "$lib/components/statblock5e/Statblock.svelte";
    import CreatureHeading from "$lib/components/statblock5e/CreatureHeading.svelte";
    import TopStats from "$lib/components/statblock5e/TopStats.svelte";
    import PropertyLine from "$lib/components/statblock5e/PropertyLine.svelte";
    import PropertyBlock from "$lib/components/statblock5e/PropertyBlock.svelte";
    import AbilitiesBlock from "$lib/components/statblock5e/AbilitiesBlock.svelte";
</script>

<div class="p-10">
    <Statblock>
        <CreatureHeading>
            <h1>Animated Armor</h1>
            <h2>Medium construct, unaligned</h2>
        </CreatureHeading>

        <TopStats>
            <PropertyLine>
                <h4>Armor Class</h4>
                <p>18 (natural armor)</p>
            </PropertyLine>
            <PropertyLine>
                <h4>Hit Points</h4>
                <p>33 (6d8 + 6)</p>
            </PropertyLine>
            <PropertyLine>
                <h4>Speed</h4>
                <p>25ft</p>
            </PropertyLine>

            <AbilitiesBlock str={14} dex={11} con={13} int={1} wis={3} cha={1}></AbilitiesBlock>

            <PropertyLine>
                <h4>Damage Immunities</h4>
                <p>poison, psychic</p>
            </PropertyLine>
            <PropertyLine>
                <h4>Condition Immunities</h4>
                <p>blinded, charmed, deafened, exhaustion, frightened, paralyzed,
                   petrified, poisoned</p>
            </PropertyLine>
            <PropertyLine>
                <h4>Senses</h4>
                <p>blindsight 60 ft. (blind beyond this radius), passive Perception 6</p>
            </PropertyLine>
            <PropertyLine>
                <h4>Languages</h4>
                <p>—</p>
            </PropertyLine>
            <PropertyLine>
                <h4>Challenge</h4>
                <p>1 (200 XP)</p>
            </PropertyLine>
        </TopStats>

        <PropertyBlock>
            <h4>Antimagic Susceptibility.</h4>
            <p>The armor is incapacitated while in the area of an <i>antimagic
                                                                     field</i>. If targeted by <i>dispel magic</i>, the armor must succeed
               on a Constitution saving throw against the caster’s spell save DC or
               fall unconscious for 1 minute.</p>
        </PropertyBlock>
        <PropertyBlock>
            <h4>False Appearance.</h4>
            <p>While the armor remains motionless, it is indistinguishable from a
               normal suit of armor.</p>
        </PropertyBlock>

        <h3>Actions</h3>

        <PropertyBlock>
            <h4>Multiattack.</h4>
            <p>The armor makes two melee attacks.</p>
        </PropertyBlock>

        <PropertyBlock>
            <h4>Slam.</h4>
            <p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
                <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
        </PropertyBlock>
    </Statblock>
</div>
