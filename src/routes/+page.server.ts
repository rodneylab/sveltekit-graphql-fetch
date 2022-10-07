import { SWOP_API_KEY } from '$env/static/private';
import type { Query, QueryLatestArgs } from '$lib/generated/graphql';
import { error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

const query = `
query latestQuery(
	$baseCurrency: String = "EUR"
	$quoteCurrencies: [String!]
) {
	latest(
		baseCurrency: $baseCurrency
		quoteCurrencies: $quoteCurrencies
	) {
		baseCurrency
		quoteCurrency
		date
		quote
	}
}
`;

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const form = await request.formData();
			const currency = form.get('currency');

			if (typeof currency === 'string') {
				const variables: QueryLatestArgs = {
					baseCurrency: 'EUR',
					quoteCurrencies: [currency]
				};

				const response = await fetch('https://swop.cx/graphql', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `ApiKey ${SWOP_API_KEY}`
					},
					body: JSON.stringify({
						query,
						variables
					})
				});

				const responseData: { data: Query } = await response.json();
				const rate = responseData.data.latest[0];

				return { rate };
			}
			return undefined;
		} catch (err: unknown) {
			const message = `Error in /login form: ${err as string}`;
			console.error(message);
			return error(500, message);
		}
	}
};

export const load: PageServerLoad = async () => {
	try {
		const variables: QueryLatestArgs = {
			baseCurrency: 'EUR',
			quoteCurrencies: ['CAD', 'GBP', 'IDR', 'INR', 'USD']
		};

		const response = await fetch('https://swop.cx/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `ApiKey ${SWOP_API_KEY}`
			},
			body: JSON.stringify({
				query,
				variables
			})
		});

		const { data: responseData }: { data: Query } = await response.json();

		return { ...responseData };
	} catch (error) {
		console.error(`Error in load function for /: ${error}`);
	}
};
