<script lang="ts">
    import { AppBar } from "@skeletonlabs/skeleton";

    let { title, desc = "", children } = $props();
</script>

<div class="mx-auto max-w-screen-md px-4 space-y-8 py-[2vw]">
    <AppBar background="bg-transparent" padding="">
        <h1 class="text-primary-500 h1 font-bold">{title}</h1>
        {#if desc}
            <p>{desc}</p>
        {/if}

    </AppBar>

    {@render children()}
</div>
