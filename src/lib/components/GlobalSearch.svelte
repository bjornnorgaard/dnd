<script lang="ts">
    import { Autocomplete, type AutocompleteOption } from "@skeletonlabs/skeleton";
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { globalSearch, type GlobalSearchState } from "$lib/stores/global-search";
    import { settings } from "$lib/stores/settings";

    let query: string = $state("");
    let dialog: HTMLDialogElement | null = $state(null);
    let results: AutocompleteOption<string>[] = $state([]);

    onMount(() => {
        const unsub = globalSearch.subscribe((s: GlobalSearchState) => {
            s.isOpen ? dialog?.showModal() : dialog?.close();
            query = "";
        });

        const closeDialog = () => globalSearch.close();
        const backdrop = document.getElementById("backdrop");
        backdrop?.addEventListener("click", closeDialog);

        return () => {
            backdrop?.removeEventListener("click", closeDialog);
            unsub();
        }
    });

    async function search() {
        if (!query.length) return;
        const res = await fetch(`/api/search?query=${query}&role=${$settings.role}`).then(r => r.json());
        results = res.map((r: string) => ({ label: r, value: r }));
    }

    async function onWindowKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            globalSearch.close();
        }

        if ((event.ctrlKey || event.metaKey) && event.key === "k") {
            event.preventDefault();
            globalSearch.open();
        }
    }

    async function onInputKeydown(event: KeyboardEvent) {
        if (event.key !== "Enter") return;
        if (!results.length) return;
        globalSearch.close();
        await goto(results[0].value);
    }

    async function onSelection(event: CustomEvent<AutocompleteOption<string>>) {
        globalSearch.close();
        await goto(event.detail.value);
    }
</script>

<svelte:window onkeydown={onWindowKeydown}/>

<dialog bind:this={dialog} class="bg-transparent">
    <div class="fixed top-0 left-0 h-screen w-screen opacity-80 bg-surface-800"></div>
    <div class="fixed top-0 left-0 h-screen w-screen p-4" id="backdrop">
        <div class="mx-auto w-full max-w-xl rounded-2xl mt-[10vw] space-y-4 card variant-filled-surface">
            <input type="search" placeholder="Search everything" bind:value={query} onkeydown={onInputKeydown} oninput={search} class="rounded-t-2xl rounded-b-none border-0 px-4 pt-3 text-4xl text-neutral-300 input">
            <Autocomplete options={results} on:selection={onSelection}/>
            <div class="flex gap-4 p-4 text-sm">
                <span><kbd class="kbd">Escape</kbd> to close</span>
                <span><kbd class="kbd">Tab</kbd> to navigate</span>
                <span><kbd class="kbd">Enter</kbd> to select</span>
            </div>
        </div>
    </div>
</dialog>
