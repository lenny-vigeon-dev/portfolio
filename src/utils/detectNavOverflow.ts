// Utility to detect if navigation elements would overflow
export function detectNavOverflow(
    headerElement: HTMLElement | null,
    sections: Array<{id: string, name: string}>
): boolean {
    if (!headerElement || !window) return true; // Default to hamburger if unsure

    // Get the actual elements
    const titleElement = headerElement.querySelector('h1') as HTMLElement;
    const controlsElement = headerElement.querySelector('.controls-container') as HTMLElement;
    const navElement = headerElement.querySelector('nav') as HTMLElement;

    if (!titleElement || !controlsElement) return true;

    // Calculate widths
    const headerWidth = headerElement.offsetWidth;
    const titleWidth = titleElement.offsetWidth;
    const controlsWidth = controlsElement.offsetWidth;

    // Estimate nav width based on sections
    const estimatedNavWidth = estimateNavWidth(sections);

    // Calculate if there's enough space (with padding)
    const totalNeededWidth = titleWidth + estimatedNavWidth + controlsWidth + 48; // 48px for margins

    return totalNeededWidth > headerWidth;
}

function estimateNavWidth(sections: Array<{id: string, name: string}>): number {
    // Estimate based on character count and typical font size
    const avgCharWidth = 8; // Approximate width per character
    const linkSpacing = 24; // Space between links
    const navPadding = 40; // Nav element padding

    const totalChars = sections.reduce((sum, section) => sum + section.name.length, 0);
    const estimatedWidth = (totalChars * avgCharWidth) + (sections.length - 1) * linkSpacing + navPadding;

    return estimatedWidth;
}
