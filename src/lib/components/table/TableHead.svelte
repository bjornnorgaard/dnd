<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<thead>
<tr>
    {@render children?.()}
</tr>
</thead>
