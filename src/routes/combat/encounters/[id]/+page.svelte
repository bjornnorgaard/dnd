<script lang="ts">
    import { liveQuery } from "dexie";
    import { addAllPlayersToEncounter, addCreatureToEncounter, addPlayerToEncounter, db, deleteEncounter, removeAllPlayersFromEncounter, removeCreatureFromEncounter, updateCreature } from "$lib/utils/database";
    import MonsterSearch from "$lib/components/CreatureSearch.svelte";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { Accordion, AccordionItem, ProgressBar } from "@skeletonlabs/skeleton";
    import { ArrowLeftCircle, ArrowRightCircle, Dices, FileWarning, PlayCircle, Skull, StopCircle } from "lucide-svelte";
    import { rollDice } from "$lib/utils/dice-roller";
    import { flip } from "svelte/animate";
    import { hitPointsColor } from "$lib/utils/hit-points-color";
    import PopupInput from "$lib/components/PopupInput.svelte";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import { routes } from "$lib/constants/routes";

    export let data;
    const encounter = liveQuery(() => db.encounters.get(data.id));
    let activeCombatant: number | null = null;

    const creatures = liveQuery(async () => {
        const encounter = await db.encounters.get(data.id);
        if (!encounter) return [];
        return db.creatures.where("id").anyOf(encounter.creatureIds).toArray();
    });

    const players = liveQuery(() => db.creatures.where("is_player").equals(1).toArray());

    async function titleChanged(e: any) {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }

        await db.encounters.update(data.id, { title: e.target.value });
    }

    async function togglePlayer(id: string) {
        if (!$encounter) {
            console.error("No encounter found");
            return;
        }

        if ($encounter.creatureIds.includes(id)) {
            await removeCreatureFromEncounter($encounter.id, id);
            return;
        }

        await addPlayerToEncounter($encounter.id, id);
    }

    async function removeEncounter() {
        await deleteEncounter(data.id);
        await goto(routes.combat());
    }

    function startTrigger() {
        activeCombatant = 0;
    }

    function stopTrigger() {
        activeCombatant = null;
    }

    function nextTrigger() {
        if (activeCombatant === null) return;
        if (activeCombatant === $creatures.length - 1) activeCombatant = 0;
        else activeCombatant++;
    }

    function previousTrigger() {
        if (activeCombatant === null) return;
        if (activeCombatant === 0) activeCombatant = $creatures.length - 1;
        else activeCombatant--;
    }

    async function rollInitiative() {
        $creatures.forEach(c => {
            c.initiative = rollDice(1, 20) + c.dexterity;
            updateCreature(c);
        });
    }

    async function submitDamage(e: CustomEvent) {
        const creature = $creatures.find(c => c.id === e.detail.id);
        if (!creature) {
            console.error("No creature found")
            return;
        }

        creature.current_hit_points -= e.detail.value;

        if (creature.current_hit_points < 0) {
            creature.current_hit_points = 0;
        }
        if (creature.current_hit_points > creature.hit_points) {
            creature.current_hit_points = creature.hit_points;
        }

        await updateCreature(creature);
    }

    async function submitInitiative(e: CustomEvent) {
        const creature = $creatures.find(c => c.id === e.detail.id);
        if (!creature) {
            console.error("No creature found")
            return;
        }

        creature.initiative = e.detail.value;
        await updateCreature(creature);
    }

</script>

{#if !$encounter}
    <p>No encounter found</p>
{:else}
    {@const e = $encounter}
    <PageWrapper title={e.title} desc="Add players and creature to use initiative tracker">
        <div class="space-y-4">
            <input type="text" class="input" value={$encounter.title} on:input={(e) => titleChanged(e)}>

            {#if !$players}
                <ProgressBar value={undefined}/>
            {:else}
                <div class="space-x-4">
                    {#if !$players.length}
                        <aside class="alert variant-filled-error">
                            <FileWarning/>
                            <div class="">
                                <p>Whoops. Seems you haven't created any player characters.</p>
                                <p>Head back to the <a class="anchor" href={routes.combat()}>/combat</a> page to create some.</p>
                            </div>
                        </aside>
                    {:else}
                        {#each $players as p}
                            {@const included = e.creatureIds.includes(p.id)}
                            <button class="chip"
                                    class:variant-filled-primary={included}
                                    class:variant-outline-primary={!included}
                                    on:click={() => togglePlayer(p.id)}>{p.name}</button>
                        {/each}
                        <button class="chip variant-outline-surface hover:variant-filled-success" on:click={async () => await addAllPlayersToEncounter(data.id)}>Everyone</button>
                        <button class="chip variant-outline-surface hover:variant-filled-error" on:click={async () => await removeAllPlayersFromEncounter(data.id)}>None</button>
                    {/if}
                </div>
            {/if}
        </div>

        <PageSection title="Combatants" desc="Click HP and initiative in rows to edit">
            <Table>
                <TableHead>
                    {#if activeCombatant !== null}
                        <th class="table-cell-fit">Init</th>
                    {/if}
                    <th>Combatant</th>
                    <th class="text-center">HP</th>
                    <th class="text-center">AC</th>
                    <th class="text-end">Actions</th>
                </TableHead>
                <TableBody>
                    {#if $creatures}
                        {#each $creatures.sort((a, b) => b.initiative - a.initiative) as p, i (p.id)}
                            <tr class="cursor-pointer"
                                class:table-row-checked={activeCombatant === i} animate:flip={{duration: 300}}
                                class:line-through={p.current_hit_points <= 0}
                                class:text-gray-500={p.current_hit_points <= 0}>

                                {#if activeCombatant !== null}
                                    <td class="table-cell-fit">
                                        <PopupInput label="Set initiative" id={p.id} on:submit={e => submitInitiative(e)}>
                                            {p.initiative}
                                        </PopupInput>
                                    </td>
                                {/if}

                                <td class="text-start">
                                    <a class="hover:anchor" class:anchor={p.current_hit_points > 0} on:click|stopPropagation href={routes.combat_creature(p.id)}>{p.name}</a>
                                </td>

                                <td class="text-center"
                                    class:text-warning-500={hitPointsColor(p, 0.25,0.50)}
                                    class:text-error-500={hitPointsColor(p, 0,0.25)}>
                                    <PopupInput label="Apply damage" help="Use negative for healing" id={p.id} on:submit={e => submitDamage(e)}>
                                        {p.current_hit_points}/{p.hit_points}
                                    </PopupInput>
                                </td>

                                <td class="text-center">{p.armor_class}</td>

                                <td class="text-end">
                                    <button class="rounded px-2 text-surface-500 hover:variant-filled-error" on:click|stopPropagation={() => removeCreatureFromEncounter(data.id, p.id)}>remove</button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                </TableBody>
            </Table>
            <div class="flex flex-wrap gap-4">
                {#if activeCombatant === null}
                    <button on:click={() => startTrigger()} class="btn btn-sm variant-filled-primary space-x-2">
                        <span>Start</span>
                        <PlayCircle/>
                    </button>
                {:else}
                    <button on:click={() => stopTrigger()} class="btn btn-sm variant-soft-surface space-x-2">
                        <span>Stop</span>
                        <StopCircle/>
                    </button>
                    <button on:click={() => previousTrigger()} class="btn btn-sm variant-filled-primary space-x-2" disabled={activeCombatant === null}>
                        <ArrowLeftCircle/>
                        <span>Previous</span>
                    </button>
                    <button on:click={() => nextTrigger()} class="btn btn-sm variant-filled-primary space-x-2" disabled={activeCombatant === null}>
                        <span>Next</span>
                        <ArrowRightCircle/>
                    </button>
                    <button on:click={() => rollInitiative()} class="btn btn-sm variant-soft-surface space-x-2" disabled={activeCombatant === null}>
                        <span>Re-roll initiative</span>
                        <Dices/>
                    </button>
                {/if}
            </div>
        </PageSection>

        <PageSection title="Add creatures" desc="Search and click to add creatures to encounter">
            <MonsterSearch on:select={e => addCreatureToEncounter(data.id, e.detail.slug)} limit={3}/>
        </PageSection>

        <PageSection title="Danger Zone" desc="Ye' be forewarned, here be dragons - mind your step">
            <Accordion>
                <AccordionItem>
                    <svelte:fragment slot="lead">
                        <Skull/>
                    </svelte:fragment>
                    <svelte:fragment slot="summary">Reveal the red button</svelte:fragment>
                    <svelte:fragment slot="content">
                        <div class="flex justify-center gap-4">
                            <button class="btn-sm variant-filled-error" on:click={() => removeEncounter()}>Delete encounter</button>
                        </div>
                    </svelte:fragment>
                </AccordionItem>
            </Accordion>
        </PageSection>

    </PageWrapper>
{/if}
