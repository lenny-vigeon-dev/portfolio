<script lang="ts">
    import "$/app.css"

    import {
        s,
        ws
    } from "$utils/styles";

    import { onMount } from "svelte";

    import Url from "../icons/Url.svelte";

    let iconSize: number = $state(16);
    const gap2: string = s("gap", 2);

    interface LinkProps {
        title: string;
        url: string;
        target?: string;
        tabindex?: number;
        _class?: string;
    }

    let {
        title,
        url,
        target = "_blank",
        tabindex = 0,
        _class = ""
    }: LinkProps = $props();

    function resizeDependentFunctions() {
        // Update icon size on resize
        // console.log(window.innerWidth)
        iconSize = ws(16);
    }

	onMount(() => {
        resizeDependentFunctions();
		window.addEventListener('resize', resizeDependentFunctions);
		return () => {
            window.removeEventListener('resize', resizeDependentFunctions);
        };
	});

</script>

<a href={url} target={target} tabindex={tabindex}
class={"flex flex-row items-center inline-center \
text-lt3 dark:text-dt3 hover:underline" +
gap2 + _class}>
    <p>{title}</p>
    <Url size={iconSize} />
</a>
