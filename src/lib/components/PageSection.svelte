<script lang="ts">
    export let title: string = "";
    export let desc: string = "";
</script>

<section class="py-4 space-y-4">
    {#if title}
        <hgroup>
            <h2 class="font-bold h2">{title}</h2>
            {#if desc}
                <span>{desc}</span>
            {/if}
        </hgroup>
    {/if}
    <slot/>
</section>
