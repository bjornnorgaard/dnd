<script lang="ts">
    import { liveQuery, type UpdateSpec } from "dexie";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { db } from "$lib/utils/database";
    import type { Creature } from "$lib/types/creature";
    import { Class } from "$lib/constants/classes";
    import { defaultSpellCharges } from "$lib/types/spell-charges.js";

    export let data;
    const player = liveQuery(async () => await db.creatures.get(data.id));

    async function submitPlayer(e: any) {
        if (!$player?.id) {
            console.error("No player found");
            return;
        }

        const selectedClass = Class[e.target.class.value as keyof typeof Class];
        let spellCharges = $player.spellCharges

        if (!$player.spellCharges) {
            spellCharges = defaultSpellCharges();
        }

        const changes: UpdateSpec<Creature> = {
            name: e.target.name.value,
            class: selectedClass,
            level: Number(e.target.level.value),
            spellCharges: spellCharges,
            current_hit_points: Number(e.target.current_hit_points.value),
            hit_points: Number(e.target.hit_points.value),
            armor_class: Number(e.target.armor_class.value),
            strength: Number(e.target.strength.value),
            dexterity: Number(e.target.dexterity.value),
            constitution: Number(e.target.constitution.value),
            intelligence: Number(e.target.intelligence.value),
            wisdom: Number(e.target.wisdom.value),
            charisma: Number(e.target.charisma.value),
        };

        await db.creatures.update(data.id, changes)
        window.history.back();
    }

    async function deletePlayer() {
        if (!$player?.id) {
            console.error("No player found");
            return;
        }

        await db.creatures.delete($player.id);
        window.history.back();
    }
</script>

<style lang="postcss">
    .row {
        @apply flex gap-4;
    }

    label {
        @apply label w-full;
    }
</style>

{#if !$player}
    <p>No player found</p>
{:else}
    {@const p = $player}

    <PageWrapper title={p.name} desc="Edit character attributes and details">
        <!--        <PageSection title="Spell Slots">-->
        <!--            <SpellSlotTracker/>-->
        <!--        </PageSection>-->

        <PageSection title="Details">
            <form class="space-y-4" on:submit|preventDefault={(e) => submitPlayer(e)}>
                <div class="row">
                    <label for="name" class="basis-2/5">
                        <span>Name</span>
                        <input class="input" type="text" id="name" autocomplete="off" value={p.name} placeholder="John Doe">
                    </label>

                    {#if p.is_player}
                        <label for="level" class="basis-1/5">
                            <span>Level</span>
                            <input class="input" type="number" id="level" autocomplete="off" value={p.level}>
                        </label>
                    {/if}

                    {#if p.is_player}
                        <label for="class" class="basis-2/5">
                            <span>Class</span>
                            <select value={p.class} id="class" class="select">
                                {#each Object.entries(Class) as [ k, v ]}
                                    <option value={k}>{v}</option>
                                {/each}
                            </select>
                        </label>
                    {/if}
                </div>

                <div class="row">
                    <label for="current_hit_points">
                        <span>Current HP</span>
                        <input class="input" type="number" id="current_hit_points" autocomplete="off" value={p.current_hit_points}>
                    </label>
                    <label for="hit_points">
                        <span>Max HP</span>
                        <input class="input" type="number" id="hit_points" autocomplete="off" value={p.hit_points}>
                    </label>
                    <label for="armor_class">
                        <span>Armor Class</span>
                        <input class="input" type="number" id="armor_class" autocomplete="off" value={p.armor_class}>
                    </label>
                </div>

                <div class="grid grid-cols-3 gap-4 md:flex">
                    <label for="strength">
                        <span>Strength</span>
                        <input class="input" type="number" id="strength" autocomplete="off" value={p.strength}>
                    </label>
                    <label for="dexterity">
                        <span>Dexterity</span>
                        <input class="input" type="number" id="dexterity" autocomplete="off" value={p.dexterity}>
                    </label>
                    <label for="constitution">
                        <span>Constitution</span>
                        <input class="input" type="number" id="constitution" autocomplete="off" value={p.constitution}>
                    </label>
                    <label for="intelligence">
                        <span>Intelligence</span>
                        <input class="input" type="number" id="intelligence" autocomplete="off" value={p.intelligence}>
                    </label>
                    <label for="wisdom">
                        <span>Wisdom</span>
                        <input class="input" type="number" id="wisdom" autocomplete="off" value={p.wisdom}>
                    </label>
                    <label for="charisma">
                        <span>Charisma</span>
                        <input class="input" type="number" id="charisma" autocomplete="off" value={p.charisma}>
                    </label>
                </div>

                <br>
                <div class="flex justify-between">
                    <div class="space-x-4">
                        <button class="btn variant-filled-primary" type="submit">Submit</button>
                        <button class="btn variant variant-ringed" type="reset" on:click={() => window.history.back()}>Back</button>
                    </div>
                    <button class="btn variant-filled-error" type="button" on:click={async () => await deletePlayer()}>Delete</button>
                </div>
            </form>
        </PageSection>
    </PageWrapper>
{/if}
