export interface DefaultProps {
	_style?: string; // Complementary style for the component
	_class?: string; // Complementary class for the component
	size?: number; // Size of the component, if applicable
}

export interface SectionData {
	id: string;
	name: string;
}

export interface Collaborator {
	name: string;
	url: string;
	title?: () => string;
	description?: () => string;
	skills?: string[];
	img?: string;
	linkedin?: string;
	github?: string;
	website?: string;
}
