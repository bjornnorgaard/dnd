<div class="host">
    <h4>
        <slot name="title"/>
    </h4>
    <p>
        <slot name="desc"/>
    </p>
</div>

<style lang="postcss">
    .host {
        margin-top: 0.8em;
        margin-bottom: 0.9em;
        line-height: 1.5;
        display: block;
    }

    h4 {
        margin: 0;
        display: inline;
        font-weight: bold;
        font-style: italic;
    }

    p:first-of-type {
        display: inline;
        text-indent: 0;
    }

    p {
        text-indent: 1em;
        margin: 0;
    }
</style>

