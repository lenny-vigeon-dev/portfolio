<script lang="ts">
    // Exemple d'imports avec les nouveaux alias
    // import { someUtility } from '$utils/helpers';
    // import { someStore } from '$stores/theme';

    // Props interface
    interface HeaderProps {
        title?: string;
    }

    let { title = "My Portfolio" }: HeaderProps = $props();
</script>

<header class="bg-gray-900 text-white py-4 px-6 flex items-center justify-between">
    <h1 class="text-2xl font-bold">{title}</h1>
    <nav>
        <ul class="flex space-x-6">
            <li><a href="#about" class="hover:text-gray-300">About</a></li>
            <li><a href="#projects" class="hover:text-gray-300">Projects</a></li>
            <li><a href="#contact" class="hover:text-gray-300">Contact</a></li>
        </ul>
    </nav>
</header>
