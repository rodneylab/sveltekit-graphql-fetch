import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const response = await fetch('/query/fx-rates.json', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ currencies: ['CAD', 'GBP', 'IDR', 'INR', 'USD'] })
		});
		return {
			...(await response.json())
		};
	} catch (error) {
		console.error(`Error in load function for /: ${error}`);
	}
};
