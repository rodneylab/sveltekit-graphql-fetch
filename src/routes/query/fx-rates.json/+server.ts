import { SWOP_API_KEY } from '$env/static/private';
import type { Query, QueryLatestArgs } from '$lib/generated/graphql';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async function POST({ request, setHeaders }) {
	try {
		const { currencies = ['CAD', 'GBP', 'IDR', 'INR', 'USD'] } = (await request.json()) as {
			currencies: string[];
		};

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

		const variables: QueryLatestArgs = {
			baseCurrency: 'EUR',
			quoteCurrencies: currencies
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
		const data: { data: Query } = await response.json();

		setHeaders({
			'Content-Type': 'application/json'
		});

		return new Response(JSON.stringify({ ...data }));
	} catch (err: unknown) {
		const message = `Error in /query/fx-rates.json.ts: ${err as string}`;
		throw error(500, message as string);
	}
};
