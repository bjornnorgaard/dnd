<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<tfoot>
<tr class="font-bold">
    {@render children?.()}
</tr>
</tfoot>
