import type { Query, QueryLatestArgs } from '$lib/generated/graphql';
import type { RequestHandler } from '@sveltejs/kit';

export async function post({ request }: { request: Request }): Promise<ReturnType<RequestHandler>> {
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
        Authorization: `ApiKey ${process.env['SWOP_API_KEY']}`
      },
      body: JSON.stringify({
        query,
        variables
      })
    });
    const data: { data: Query } = await response.json();

    return {
      body: JSON.stringify({ ...data })
    };
  } catch (err) {
    const error = `Error in /query/fx-rates.json.ts: ${err}`;
    console.error(error);
    return {
      status: 500,
      body: error
    };
  }
}
