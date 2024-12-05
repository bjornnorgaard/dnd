<script>
    /** @type {{children?: import('svelte').Snippet}} */
    let { children } = $props();
</script>

<div class="border-2 shadow-2xl table-container border-surface-900">
    <table class="table table-compact table-hover">
        {@render children?.()}
    </table>
</div>
