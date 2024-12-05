<script lang="ts">
    import { Role, settings } from "$lib/stores/settings";

    let options = [
        { label: "A Player Character", value: Role.Pc, desc: "Tools for helping you out as a player" },
        { label: "The Dungeon Master", value: Role.Dm, desc: "Enable everything for running games" },
    ];
</script>

<div class="mt-4 space-y-4">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {#each options as o}
            <button class="btn"
                    class:variant-soft-primary={o.value !== $settings.role}
                    class:variant-filled-primary={o.value === $settings.role}
                    onclick={() => $settings.role = o.value}>
                {o.label}
            </button>
        {/each}
    </div>
</div>
