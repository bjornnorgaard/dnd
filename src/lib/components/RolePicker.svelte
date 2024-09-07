<script lang="ts">
    import { Role, settings } from "$lib/stores/settings";
</script>

<div class="space-y-4 mt-4">
    <div class="flex flex-col sm:flex-row gap-4">
        <button class="w-full bg-gradient-to-br font-bold btn btn-xl from-primary-500 to-success-500"
                on:click={() => $settings.role = Role.Pc}>
            A Player Character
        </button>
        <button class="w-full bg-gradient-to-br font-bold btn btn-xl from-primary-500 to-error-500"
                on:click={() => $settings.role= Role.Dm}>
            The Dungeon Master
        </button>
    </div>
</div>
