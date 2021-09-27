import type { Request } from '@sveltejs/kit';

export async function post(
  request: Request & { body: { currencies: string[] } }
): Promise<{ body: string } | { error: string; status: number }> {
  try {
    const { currencies = ['CAD', 'GBP', 'IDR', 'INR', 'USD'] } = request.body;

    const query = `
      query latestQuery(
        $latestQueryBaseCurrency: String = "EUR"
        $latestQueryQuoteCurrencies: [String!]
      ) {
        latest(
          baseCurrency: $latestQueryBaseCurrency
          quoteCurrencies: $latestQueryQuoteCurrencies
        ) {
          baseCurrency
          quoteCurrency
          date
          quote
        }
      }
    `;

    const variables = {
      latestQueryBaseCurrency: 'EUR',
      latestQueryQuoteCurrencies: currencies
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
    const data = await response.json();

    return {
      body: JSON.stringify({ ...data })
    };
  } catch (err) {
    const error = `Error in /query/fx-rates.json.ts: ${err}`;
    console.error(error);
    return {
      status: 500,
      error
    };
  }
}
