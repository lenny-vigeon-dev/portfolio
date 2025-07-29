<!-- <script lang="ts">
    import type { Component } from 'svelte';
    import {
        colored_title,
        primary_gradient,
        primary_gradient_border
    } from "$utils/styles";

    interface LogoProps {
        text: string;
        logo?: Component<any>; // Type plus flexible pour composant Svelte
        onclick?: () => void; // En Svelte c'est 'onclick' pas 'onClick'
        _class?: string;
    }

    let { text, logo, onclick, _class = "" }: ButtonProps = $props(); // Destructuration correcte
    const Logo: Component<any> | undefined = logo; // Utilisation de la variable destructurée
// hover:bg-primary
</script> -->

<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
class="lucide lucide-mail w-5 h-5 mr-2">
    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
</svg>
