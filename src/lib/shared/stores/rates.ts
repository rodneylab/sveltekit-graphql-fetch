import type { Rate } from '$lib/generated/graphql';
import { writable } from 'svelte/store';

const rates = writable<Rate[]>([]);

export { rates as default };
