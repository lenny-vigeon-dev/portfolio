export function detectActiveSection(sections: string[]): string {
    if (!window) return "";

    // Get header height for better detection
    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight || 80;
    const scrollPosition = window.scrollY + headerHeight + 20; // Header height + small buffer

    // Check if we're at the very top (before any section)
    if (window.scrollY < 100) {
        return "";
    }

    for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                return sectionId;
            }
        }
    }

    // If no section is detected, clear active section
    return "";
}
