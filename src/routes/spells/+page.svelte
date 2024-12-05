<script lang="ts">
    import PageWrapper from "$lib/components/PageWrapper.svelte";
    import PageSection from "$lib/components/PageSection.svelte";
    import { onMount } from "svelte";
    import SearchInput from "$lib/components/SearchInput.svelte";
    import Table from "$lib/components/table/Table.svelte";
    import TableHead from "$lib/components/table/TableHead.svelte";
    import TableBody from "$lib/components/table/TableBody.svelte";
    import { routes } from "$lib/components/navigation/routes";
    import PageSettings from "$lib/components/PagingSettings.svelte";
    import { DEFAULT_PAGE_SIZE } from "$lib/constants/paging";
    import type { Spell } from "$lib/types/spell";

    let query = "";
    let offset = 0;
    let limit = DEFAULT_PAGE_SIZE;
    let spells: Spell[] = $state([]);

    onMount(async () => await searchSpells());

    async function searchSpells() {
        query = query.trim();
        spells = await fetch(routes.api_spells(query, limit, offset)).then(r => r.json());
    }

    async function onQueryUpdated(q: string) {
        query = q;
        offset = 0;
        await searchSpells();
    }

    async function onPageUpdated(e: CustomEvent) {
        limit = e.detail.limit;
        offset = e.detail.offset;
        await searchSpells();
    }
</script>

<PageWrapper title="Spells" desc="Search and view spell details">
    <PageSection>
        <SearchInput label="Search Spells" input={async (e: string) => await onQueryUpdated(e)}/>
        <PageSettings update={onPageUpdated} bind:count={spells.length}/>
        <Table>
            <TableHead>
                <th class="table-cell-fit">Level</th>
                <th>Name</th>
                <th class="table-cell-fit">School</th>
                <th class="table-cell-fit">Time</th>
                <th>Duration</th>
                <th>Range</th>
            </TableHead>
            <TableBody>
                {#each spells as s}
                    <tr>
                        <td class="table-cell-fit">{s.spell_level}</td>
                        <td class="anchor">
                            <a href={routes.spells_slug(s.slug)}>
                                {s.name}
                            </a>
                        </td>
                        <td class="table-cell-fit">{s.school}</td>
                        <td><span class="line-clamp-1">{s.casting_time}</span></td>
                        <td>{s.duration}</td>
                        <td><span class="line-clamp-1">{s.range}</span></td>
                    </tr>
                {/each}
            </TableBody>
        </Table>
    </PageSection>
</PageWrapper>
