import { writable } from 'svelte/store';

const rates = writable([]);

export { rates as default };
