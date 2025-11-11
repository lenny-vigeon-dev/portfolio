import type { Collaborator } from './interfaces';
import { rm } from '$utils/reactiveMessages.svelte'; // rm = reactive messages

export const JJA: Collaborator = {
	name: 'Jean-Pierre Janopoulos',
	url: 'https://www.linkedin.com/in/jean-pierre-janopoulos-478811253/',
	title: rm.jean_pierre_janopoulos_title,
	description: rm.jean_pierre_janopoulos_description,
	skills: ['Python', 'SQL', 'C', 'C++'],
	linkedin: 'https://www.linkedin.com/in/jean-pierre-janopoulos-478811253/',
	github: 'https://github.com/ianophael'
};

export const ARO: Collaborator = {
	name: 'Antoine Rospars',
	url: 'https://antoinerospars.dev/',
	title: rm.antoine_rospars_title,
	description: rm.antoine_rospars_description,
	skills: ['TypeScript', 'NestJS', 'React', 'Prisma'],
	linkedin: 'https://www.linkedin.com/in/antoinerospars/',
	github: 'https://github.com/P4ST4S',
	website: 'https://antoinerospars.dev/'
};
