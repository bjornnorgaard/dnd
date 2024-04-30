<script lang="ts">
    import { db } from "$lib/utils/database";
    import { liveQuery } from "dexie";
    import { goto } from "$app/navigation";
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { newPlayer } from "$lib/utils/type-constructors";
    import { newEncounter } from "$lib/utils/type-constructors.js";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";

    import { routes } from "$lib/constants/routes";

    const encounters = liveQuery(async () => await db.encounters.toArray());
    const players = liveQuery(async () => await db.creatures.where({ is_player: 1 }).toArray());

    async function createEncounter() {
        const e = newEncounter({ title: "Unnamed Encounter" });
        const createdId = await db.encounters.add(e);
        await goto(routes.combat_encounter(createdId));
    }

    async function createPlayer() {
        const player = newPlayer({ name: "Unnamed Player", armorClass: 10, hitPoints: 10, dexterity: 0 });
        await db.creatures.add(player, player.id);
        await goto(routes.combat_creature(player.id));
    }
</script>

<PageWrapper title="Combat" desc="Create encounters and use initiative tracker">
    <PageSection title="Encounters" desc="Encounters are a collection of monsters and players">
        <Table>
            <TableHead>
                <th>Encounter</th>
                <th>Creatures</th>
            </TableHead>
            <TableBody>
                {#if $encounters}
                    {#each $encounters as e}
                        <tr>
                            <td><a class="anchor" href="{routes.combat_encounter(e.id)}">{e.title}</a></td>
                            <td>{e.creatureIds.length}</td>
                        </tr>
                    {/each}
                {/if}
            </TableBody>
        </Table>
        <div>
            <button on:click="{async () => await createEncounter()}" class="btn btn-sm variant-filled-primary">New Encounter</button>
        </div>
    </PageSection>
    <PageSection title="Players" desc="Players are characters that can be added to encounters">
        <Table>
            <TableHead>
                <th>Player</th>
                <th>HP</th>
                <th>AC</th>
                <th>Initiative</th>
            </TableHead>
            <TableBody>
                {#if $players}
                    {#each $players as p}
                        <tr>
                            <td><a class="anchor" href="{routes.combat_creature(p.id)}">{p.name}</a></td>
                            <td>{p.current_hit_points}/{p.hit_points}</td>
                            <td>{p.armor_class}</td>
                            <td>{p.dexterity}</td>
                        </tr>
                    {/each}
                {/if}
            </TableBody>
        </Table>
        <div>
            <button on:click="{async () => await createPlayer()}" class="btn btn-sm variant-filled-primary">New Player</button>
        </div>
    </PageSection>
</PageWrapper>
