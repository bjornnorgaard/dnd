<script lang="ts">
    let { title = "", desc = "", children }= $props();
</script>

<section class="py-4 space-y-4">
    {#if title}
        <hgroup>
            <h2 class="h2 font-bold text-primary-500">{title}</h2>
            {#if desc}
                <span>{desc}</span>
            {/if}
        </hgroup>
    {/if}
    {@render children?.()}
</section>
