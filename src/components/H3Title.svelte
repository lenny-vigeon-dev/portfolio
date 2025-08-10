<script lang="ts">
    import "$/app.css"

    interface H3TitleProps {
        title: string;
        _class?: string;
    }

    let { title, _class = "" }: H3TitleProps = $props();

</script>

<h3 class={_class + "font-semibold \
group-hover:text-lcol2 dark:group-hover:text-dcol1 \
tracking-tight transition-colors duration-300"}>
    {title}
</h3>
