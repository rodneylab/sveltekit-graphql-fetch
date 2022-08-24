import client from 'undefined';
import type {} from '@apollo/client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
	BigDecimal: any;
	/** The `Date` scalar type represents a date value as specified by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). */
	Date: any;
	/** The `DateTime` scalar type represents a date/time value as specified by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601). */
	DateTime: any;
};

/** Base quote path - calculation path from base currency to quote currency */
export type BaseQuotePathType = {
	__typename?: 'BaseQuotePathType';
	/** Calculated quote of this path from base currency to quote currency */
	pathRate: Scalars['BigDecimal'];
	/** Ordered list of rates used for this path, with source details */
	sourceRates: Array<SourceRateType>;
	/** Weight of this path in the calculation of the final rate */
	weight: Scalars['Float'];
};

/** Converted `amount` from `baseCurrency` to a `quoteCurrency` on a specific `date`. */
export type ConvertedAmount = {
	__typename?: 'ConvertedAmount';
	baseAmount: Scalars['BigDecimal'];
	baseCurrency: Scalars['String'];
	date: Scalars['Date'];
	quoteAmount: Scalars['BigDecimal'];
	quoteCurrency: Scalars['String'];
};

/** Currency meta data - ISO 4217 */
export type CurrencyType = {
	__typename?: 'CurrencyType';
	active: Scalars['Boolean'];
	code: Scalars['String'];
	decimalDigits: Scalars['Int'];
	name: Scalars['String'];
	numericCode?: Maybe<Scalars['String']>;
};

/** Quote for a specific date (optionally with meta) */
export type DateQuote = {
	__typename?: 'DateQuote';
	date: Scalars['Date'];
	meta?: Maybe<RateMetaType>;
	quote: Scalars['BigDecimal'];
};

/** Rate fluctuation of a currency pair (`baseCurrency`/`quoteCurrency`) between two given dates */
export type Fluctuation = {
	__typename?: 'Fluctuation';
	baseCurrency: Scalars['String'];
	dateFrom: Scalars['Date'];
	dateTo: Scalars['Date'];
	fluctuation: Scalars['BigDecimal'];
	fluctuationPercent: Scalars['BigDecimal'];
	quoteCurrency: Scalars['String'];
	rateFrom: Rate;
	rateTo: Rate;
};

export type Query = {
	__typename?: 'Query';
	/** Returns a converted amount for the given baseCurrency/quoteCurrency on a date */
	convert: Array<ConvertedAmount>;
	/** Returns meta data for currencies */
	currencies: Array<CurrencyType>;
	/** Returns the rate fluctuation for the given date range */
	fluctuation: Array<Fluctuation>;
	/** Returns the rates for a specific date */
	historical: Array<Rate>;
	/** Returns the latest rates */
	latest: Array<Rate>;
	/** Returns the time series of rates for the given date range */
	timeSeries: Array<TimeSeries>;
};

export type QueryConvertArgs = {
	amount: Scalars['BigDecimal'];
	baseCurrency: Scalars['String'];
	date?: Maybe<Scalars['Date']>;
	quoteCurrencies?: Maybe<Array<Scalars['String']>>;
};

export type QueryCurrenciesArgs = {
	currencyCodes?: Maybe<Array<Scalars['String']>>;
	includeHistorical?: Maybe<Scalars['Boolean']>;
};

export type QueryFluctuationArgs = {
	baseCurrency?: Maybe<Scalars['String']>;
	dateFrom: Scalars['Date'];
	dateTo: Scalars['Date'];
	quoteCurrencies?: Maybe<Array<Scalars['String']>>;
};

export type QueryHistoricalArgs = {
	baseCurrency?: Maybe<Scalars['String']>;
	date: Scalars['Date'];
	quoteCurrencies?: Maybe<Array<Scalars['String']>>;
};

export type QueryLatestArgs = {
	baseCurrency?: Maybe<Scalars['String']>;
	quoteCurrencies?: Maybe<Array<Scalars['String']>>;
};

export type QueryTimeSeriesArgs = {
	baseCurrency?: Maybe<Scalars['String']>;
	dateFrom: Scalars['Date'];
	dateTo: Scalars['Date'];
	quoteCurrencies?: Maybe<Array<Scalars['String']>>;
};

/** Exchange rate (`quote`) from `baseCurrency` to a `quoteCurrency` on a specific `date` (1 `baseCurrency` = `quote` `quoteCurrency`) */
export type Rate = {
	__typename?: 'Rate';
	baseCurrency: Scalars['String'];
	date: Scalars['Date'];
	meta?: Maybe<RateMetaType>;
	quote: Scalars['BigDecimal'];
	quoteCurrency: Scalars['String'];
};

/** Rate meta data - sources and calculation for rate */
export type RateMetaType = {
	__typename?: 'RateMetaType';
	calculated: Scalars['Boolean'];
	calculation: Array<BaseQuotePathType>;
	calculationDescription: Scalars['String'];
	calculationShortDescription: Scalars['String'];
	rateType: Scalars['String'];
	sourceIds: Array<Scalars['String']>;
	sourceNames: Scalars['String'];
	sourceShortNames?: Maybe<Scalars['String']>;
	sources: Array<SourceType>;
};

/** Source rate - rate directly obtained from currency source */
export type SourceRateType = {
	__typename?: 'SourceRateType';
	baseCurrency: Scalars['String'];
	date: Scalars['Date'];
	/** Timestamp when the rate was fetched from the source */
	fetched: Scalars['DateTime'];
	/** If baseCurrency/quoteCurrency from the source were flipped for this calculation */
	flipped: Scalars['Boolean'];
	/** The quote from the source */
	quote: Scalars['BigDecimal'];
	quoteCurrency: Scalars['String'];
	source: SourceType;
	sourceId: Scalars['String'];
};

/** Currency source information */
export type SourceType = {
	__typename?: 'SourceType';
	id: Scalars['String'];
	name: Scalars['String'];
	shortName: Scalars['String'];
};

/** Exchange rate time series for a given currency pair */
export type TimeSeries = {
	__typename?: 'TimeSeries';
	baseCurrency: Scalars['String'];
	quoteCurrency: Scalars['String'];
	quotes: Array<DateQuote>;
};
