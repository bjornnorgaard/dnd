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
        line-height: 1.4;
        display: block;
        text-indent: -1em;
        padding-left: 1em;
    }

    h4 {
        margin: 0;
        display: inline;
        font-weight: bold;
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

