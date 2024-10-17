<script lang="ts">
  import {
    activeSpellbookIndex,
    spellbookStore,
  } from "$lib/stores/spellbookStore";
  import PageWrapper from "$lib/components/PageWrapper.svelte";
  import {
    Accordion,
    AccordionItem,
    Tab,
    TabGroup,
  } from "@skeletonlabs/skeleton";
  import { AlertCircle, PlusCircle, Search } from "lucide-svelte";
  import { DEFAULT_PAGE_SIZE } from "$lib/constants/paging";
  import { routes } from "$lib/components/navigation/routes";
  import TableHead from "$lib/components/table/TableHead.svelte";
  import Table from "$lib/components/table/Table.svelte";
  import TableBody from "$lib/components/table/TableBody.svelte";
  import { fly } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import { flip } from "svelte/animate";
  import type { Spell } from "$lib/types/spell";
  import DropDownClasses from "$lib/components/DropDownClasses.svelte";
  import DropDownLevels from "$lib/components/DropDownLevels.svelte";
  import { SlideToggle } from "@skeletonlabs/skeleton";

  let ownerInput = "";
  let searchInput = "";
  let spells: Spell[] = [];
  let selectedLevel = "";
  let selectedClass = "";
  let originalSpellsOrder: Spell[] = [];
  let isSortingByAscending = false;
  let a5e: boolean = false;
  let groupedSpells: Record<string, Spell[]> = {};

  $: {
    $spellbookStore[$activeSpellbookIndex]?.spells || [];
    groupSpellsByLevel();
  }

  function createSpellbook() {
    if (!ownerInput) {
      return;
    }

    if ($spellbookStore.find((b) => b.name === ownerInput)) {
      return;
    }

    $spellbookStore = [...$spellbookStore, { name: ownerInput, spells: [] }];
    $activeSpellbookIndex = $spellbookStore.length - 1;
    ownerInput = "";
  }

  function deleteSpellbook(index: number) {
    if ($activeSpellbookIndex === index && $activeSpellbookIndex !== 0) {
      $activeSpellbookIndex = index - 1;
    }
    $spellbookStore = $spellbookStore.filter((_, i) => i !== index);
  }

  function removeSpell(spellbookIndex: number, spellIndex: number) {
    $spellbookStore[spellbookIndex].spells = $spellbookStore[
      spellbookIndex
    ].spells.filter((_, i) => i !== spellIndex);
  }

  async function searchSpells() {
    let query = searchInput.trim();
    if (selectedLevel !== "") {
      query += ` l:${selectedLevel}`;
    }
    if (selectedClass !== "") {
      query += ` c:${selectedClass}`;
    }
        spells = await fetch(routes.api_spells(query, DEFAULT_PAGE_SIZE, 0, a5e)).then((r) => r.json());
    originalSpellsOrder = [...spells];
    isSortingByAscending = false;
  }

  function addSpell(spell: Spell) {
    if (!spell?.slug.length) {
      return;
    }

        const alreadyAdded = $spellbookStore[$activeSpellbookIndex].spells.find((s) => s.slug === spell.slug);
        if (alreadyAdded) {
            searchInput = "";
            spells = [];
            return;
        }

    $spellbookStore[$activeSpellbookIndex].spells = [
      ...$spellbookStore[$activeSpellbookIndex].spells,
      spell,
    ];
    sortSpellbook($activeSpellbookIndex);
    searchInput = "";
    spells = [];
  }

  function sortSpellbook(index: number) {
    $spellbookStore[index].spells = $spellbookStore[index].spells.sort(
      (a, b) => a.level_int - b.level_int
    );
  }

  async function searchKeyUp(e: KeyboardEvent) {
    if (!searchInput) {
      spells = [];
      return;
    }

    if (e.key === "Enter" && spells.length) {
      addSpell(spells[0]);
      return;
    }
    await searchSpells();
  }

  async function handleLevelUpdate(event: CustomEvent) {
    selectedLevel = event.detail.level;
    await searchSpells();
  }

  async function handleClassUpdate(event: CustomEvent) {
    selectedClass = event.detail.class;
    await searchSpells();
  }

  function handleLevelSort() {
    if (isSortingByAscending) {
      spells = spells.sort((a, b) => b.level_int - a.level_int);
      isSortingByAscending = false;
      return;
    }

    spells = spells.sort((a, b) => a.level_int - b.level_int);
    isSortingByAscending = true;
  }

  function handleNameSort() {
    spells = [...originalSpellsOrder].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  function groupSpellsByLevel() {
    const currentSpellBook = $spellbookStore[$activeSpellbookIndex];
    if (!currentSpellBook) {
      console.log("No spellbook found based on index", $activeSpellbookIndex);
      return;
    }

    groupedSpells = {};
    currentSpellBook.spells.forEach((s) => {
            const levelKey = s.level_int < 1 ? "Cantrips" : `Level ${s.level_int} spells`;
      if (!groupedSpells[levelKey]) {
        groupedSpells[levelKey] = [];
      }
      groupedSpells[levelKey].push(s);
    });
  }
</script>

<PageWrapper title="Spellbook" desc="Manage your spells">
  {#if $spellbookStore.length === 0}
    <aside class="flex flex-col alert variant-ghost-warning">
      <div class="flex items-center gap-4">
        <AlertCircle />
        <h3 class="h3">No spellbooks yet...</h3>
      </div>
      <div class="alert-message">
        <p>Use the input above to create your first spellbook.</p>
      </div>
    </aside>

    <form on:submit|preventDefault={() => createSpellbook()} class="flex gap-4">
      <label for="input" class="w-full label">
        <span>Who will own this spellbook?</span>
        <span class="flex w-full gap-2">
          <input
            id="input"
            type="text"
            class="input"
            autocomplete="off"
            bind:value={ownerInput}
            placeholder="Character name..."
          />
          <button
            class="btn"
            class:variant-filled-surface={!ownerInput.length}
            class:variant-filled-primary={ownerInput.length}
            type="button"
            disabled={!ownerInput}
            on:click={() => createSpellbook()}
          >
            Create
          </button>
        </span>
      </label>
    </form>
  {:else}
    <TabGroup active="border-b-2 border-surface-500">
      {#each $spellbookStore as b, bi}
        <Tab bind:group={$activeSpellbookIndex} name={b.name} value={bi}>
          <h2
            class="h2"
            class:font-bold={$activeSpellbookIndex === bi}
            class:text-surface-500={$activeSpellbookIndex !== bi}
            class:text-primary-500={$activeSpellbookIndex === bi}
          >
            {b.name}
          </h2>
        </Tab>
      {/each}
      <Tab bind:group={$activeSpellbookIndex} name="new" value={99}>
        <div
          class="btn-icon btn-icon-sm"
          class:text-surface-500={$activeSpellbookIndex !== 99}
          class:text-primary-500={$activeSpellbookIndex === 99}
        >
          <PlusCircle />
        </div>
      </Tab>

      <svelte:fragment slot="panel">
        <Accordion
          spacing="space-y-2"
          regionPanel="variant-soft-surface"
          regionControl="variant-soft-surface"
        >
          {#if $activeSpellbookIndex === 99 || $spellbookStore.length === 0}
            <form
              on:submit|preventDefault={() => createSpellbook()}
              class="flex gap-4"
            >
              <label for="input" class="w-full label">
                <span>Who will own this spellbook?</span>
                <span class="flex w-full gap-2">
                  <input
                    id="input"
                    type="text"
                    class="input"
                    autocomplete="off"
                    bind:value={ownerInput}
                    placeholder="Character name..."
                  />
                  <button
                    class="btn"
                    class:variant-filled-surface={!ownerInput.length}
                    class:variant-filled-primary={ownerInput.length}
                    type="button"
                    disabled={!ownerInput}
                    on:click={() => createSpellbook()}
                  >
                    Create
                  </button>
                </span>
              </label>
            </form>
          {/if}
          {#if $activeSpellbookIndex !== 99}
            <div class="mb-8">
              <p class="py-1">Search and select to add spells</p>
              <div
                class="input-group input-group-divider grid-cols-[auto_1fr_auto]"
              >
                <div class="input-group-shim">
                  <Search />
                </div>
                <input
                  class="input"
                  type="search"
                  placeholder="Search spells..."
                  bind:value={searchInput}
                  on:keyup={async (e) => await searchKeyUp(e)}
                />
              </div>
              <div class="flex py-2 gap-2">
                <DropDownLevels on:update={handleLevelUpdate}></DropDownLevels>
                <DropDownClasses on:update={handleClassUpdate}
                ></DropDownClasses>
                <div class="ml-auto">
                  <SlideToggle name="a5e-slider" bind:checked={a5e}
                    >a5e</SlideToggle
                  >
                </div>
              </div>
              {#if spells[0]?.name}
                <p class="py-1">
                  Use <kbd class="kbd">enter</kbd> to add {spells[0].name}
                </p>
              {/if}
            </div>

            {#if spells.length}
              <Table>
                <TableHead>
                  <th>
                    <button on:click={() => handleLevelSort()}>Level</button>
                  </th>
                  <th>
                    <button on:click={() => handleNameSort()}>Name</button>
                  </th>
                  <th class="">School</th>
                  <th>Duration</th>
                </TableHead>
                <TableBody>
                  {#each spells as s}
                    <tr role="button" on:click={() => addSpell(s)}>
                      <td class="">{s.spell_level}</td>
                      <td class="anchor">
                        <a href={routes.spells_slug(s.slug)}>
                          {s.name}
                        </a>
                      </td>
                      <td class="">{s.school}</td>
                      <td>{s.duration}</td>
                    </tr>
                  {/each}
                </TableBody>
              </Table>
            {/if}

            {#if Object.keys(groupedSpells).length}
              {#each Object.entries(groupedSpells) as [level, spells]}
                <div class="spell-section">
                  <h2 class="spell-level-title">{level}</h2>
                  <hr class="spell-divider" />
                  {#each spells as s, si (s.slug)}
                    <div
                      animate:flip={{ duration: 300 }}
                      in:fly={{
                        x: -100,
                        easing: cubicInOut,
                        delay: 200,
                        duration: 100,
                      }}
                      out:fly={{ x: 100, easing: cubicInOut, duration: 100 }}
                    >
                      <AccordionItem>
                        <svelte:fragment slot="summary">
                          <div class="flex justify-between gap-4">
                            <div class="flex items-center gap-4">
                              <span
                                class="badge badge-icon variant-outline sm:hidden"
                                >{s.level_int < 1 ? "C" : s.level_int}</span
                              >
                              <span
                                class="hidden badge variant-outline sm:block"
                                >{s.level}</span
                              >
                              <span class="font-bold text-primary-500"
                                >{s.name}</span
                              >
                            </div>
                            <div class="flex gap-2">
                              {#if s.can_be_cast_as_ritual}
                                <span class="badge variant-outline-primary"
                                  >Ritual</span
                                >
                              {/if}
                              {#if s.casting_time !== "1 action"}
                                <span
                                  class="hidden badge variant-outline-secondary sm:block"
                                  >{s.casting_time.slice(0, 10)}</span
                                >
                              {/if}
                              {#if s.range.toLowerCase() !== "self"}
                                <span
                                  class="hidden badge variant-outline-tertiary sm:block"
                                  >{s.range}</span
                                >
                              {/if}
                              {#if s.duration.toLowerCase() !== "instantaneous"}
                                <span
                                  class="hidden badge variant-outline-success sm:block"
                                  >{s.duration}</span
                                >
                              {/if}
                              <span
                                class="hidden badge variant-outline-surface md:block"
                                >{s.components}</span
                              >
                            </div>
                          </div>
                        </svelte:fragment>
                        <svelte:fragment slot="content">
                          <div class="px-2 pt-2 pb-4">
                            <div class="relative">
                              <button
                                class="absolute top-0 right-0 btn btn-sm hover:variant-filled-error"
                                on:click={() =>
                                  removeSpell($activeSpellbookIndex, si)}
                                >Remove</button
                              >
                              <p>
                                <b>School</b>
                                {s.level}
                                {s.school.toLowerCase()}
                                {s.can_be_cast_as_ritual ? "(ritual)" : ""}
                              </p>
                              <p><b>Casting Time</b> {s.casting_time}</p>
                              <p><b>Range</b> {s.range}</p>
                              <p><b>Components</b> {s.components}</p>
                              {#if s.requires_material_components}
                                <p><b>Materials</b> {s.material}</p>
                              {/if}
                              <p>
                                <b>Duration</b>
                                {s.requires_concentration
                                  ? "Concentration,"
                                  : ""}
                                {s.duration.toLowerCase()}
                              </p>
                            </div>
                            <p class="pt-2 indent-4">{s.desc}</p>
                            {#if s.higher_level}
                              <p class="pt-2">
                                <b>At Higher Levels</b>
                                {s.higher_level}
                              </p>
                            {/if}
                          </div>
                        </svelte:fragment>
                      </AccordionItem>
                    </div>
                  {/each}
                </div>
              {/each}
            {/if}
            <div class="flex justify-between pt-8 gap-4">
              <a
                href={routes.spellbook_printable($activeSpellbookIndex)}
                class="anchor"
                type="button"
              >
                View Printer Friendly Version
              </a>

              <button
                class="btn text-surface-600-300-token hover:variant-filled-error"
                type="reset"
                on:click={() => deleteSpellbook($activeSpellbookIndex)}
              >
                Delete {$spellbookStore[$activeSpellbookIndex].name}'s Spellbook
              </button>
            </div>
          {/if}
        </Accordion>
      </svelte:fragment>
    </TabGroup>
  {/if}
</PageWrapper>
