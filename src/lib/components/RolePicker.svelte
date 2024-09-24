<script lang="ts">
    import { Role, settings } from "$lib/stores/settings";
</script>

<div class="mt-4 space-y-4">
    <div class="flex flex-col gap-4 sm:flex-row">
        <button class="w-full btn variant-filled-primary"
                on:click={() => $settings.role = Role.Pc}>
            A Player Character
        </button>
        <button class="w-full btn variant-soft-primary"
                on:click={() => $settings.role= Role.Dm}>
            The Dungeon Master
        </button>
    </div>
</div>
