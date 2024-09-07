<script lang="ts">
    export let title: string = "";
    export let desc: string = "";
</script>

<section class="py-4 space-y-4">
    {#if title}
        <hgroup>
            <h2 class="bg-gradient-to-br box-decoration-clone bg-clip-text font-bold text-transparent h2 from-secondary-300 to-secondary-500">{title}</h2>
            {#if desc}
                <span>{desc}</span>
            {/if}
        </hgroup>
    {/if}
    <slot/>
</section>
