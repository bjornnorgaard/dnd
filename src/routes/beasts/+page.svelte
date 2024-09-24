<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import type { Creature } from "$lib/types/creature";
    import { onMount } from "svelte";
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Table from "$lib/components/Table.svelte";
    import TableHead from "$lib/components/TableHead.svelte";
    import TableBody from "$lib/components/TableBody.svelte";
    import { routes } from "$lib/constants/routes";
    import PageSettings from "$lib/components/PagingSettings.svelte";

    let creatures: Creature[] = [];
    let query = "";
    let limit = 10;
    let offset = 0;

    onMount(async () => await searchCreatures());

    async function searchCreatures() {
        creatures = await fetch(routes.api_creatures(query, limit, offset)).then(r => r.json());
    }

    async function onQueryUpdated(q: string) {
        query = q;
        offset = 0;
        await searchCreatures();
    }

    async function onPageUpdated(e: CustomEvent) {
        offset = e.detail.offset;
        limit = e.detail.limit;
        await searchCreatures();
    }
</script>

<PageWrapper title="Creatures" desc="Search and view creatures">
    <PageSection>
        <SearchInput label="Search Creatures" on:input={async (e) => await onQueryUpdated(e.detail)}/>
        <PageSettings on:update={onPageUpdated} bind:count={creatures.length}/>
        <Table>
            <TableHead>
                <th>CR</th>
                <th>Name</th>
                <th>AC</th>
                <th>Type</th>
                <th>Size</th>
            </TableHead>
            <TableBody>
                {#each creatures as c}
                    <tr>
                        <td>{c.challenge_rating}</td>
                        <td><a class="anchor" href={routes.beasts_slug(c.slug)}>{c.name}</a></td>
                        <td>{c.armor_class}</td>
                        <td>{c.type}</td>
                        <td>{c.size}</td>
                    </tr>
                {/each}
            </TableBody>
        </Table>
    </PageSection>
</PageWrapper>
