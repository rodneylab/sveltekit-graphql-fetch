<script lang="ts">
	import rates from '$lib/shared/stores/rates';
	import '$lib/styles/global.css';
	import type { ActionData, PageData } from './$types';
	import '@fontsource/source-sans-pro/latin.css';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	$effect(() => {
		if (data.latest) {
			rates.set(data.latest);
		}
	});

	$effect(() => {
		if (
			form?.rate &&
			!$rates.find(({ quoteCurrency }) => quoteCurrency === form.rate.quoteCurrency)
		) {
			rates.set([...$rates, form.rate]);
		}
	});
</script>

<main class="container">
	<div class="heading">
		<h1>FX Rates</h1>
	</div>
	<ul class="content">
		{#each $rates as { baseCurrency, quoteCurrency, date, quote }}
			<li>
				<h2>{`${baseCurrency}\\${quoteCurrency}`}</h2>
				<dl>
					<dt>
						{`1 ${baseCurrency}`}
					</dt>
					<dd>
						<span class="rate">
							{quote.toFixed(2)}
							{quoteCurrency}
						</span>
						<details><summary>More information...</summary>Date: {date}</details>
					</dd>
				</dl>
			</li>
		{/each}
	</ul>

	<form method="POST">
		<span class="screen-reader-text"
			><label for="additional-currency">Additional Currency</label></span
		>
		<input
			required
			id="additional-currency"
			name="currency"
			placeholder="AUD"
			title="Add another currency"
			type="text"
		/>
		<button type="submit">Add currency</button>
	</form>
</main>

<style>
	.container {
		display: flex;
		flex-direction: column;
		background: #ff6b6b;
		min-height: 100vh;
		color: #1a535c;
		font-family: 'Source Sans Pro';
	}

	.content {
		margin: 3rem auto 1rem;
		width: 50%;
		border-radius: 1rem;
		border: #f7fff7 solid 1px;
	}

	.heading {
		background: #f7fff7;
		text-align: center;
		width: 50%;
		border-radius: 1rem;
		border: #1a535c solid 1px;
		margin: 3rem auto 0rem;
		padding: 0 1.5rem;
	}

	h1 {
		color: #1a535c;
	}

	ul {
		background: #1a535c;
		list-style-type: none;
		padding: 1.5rem;
	}

	li {
		margin-bottom: 1.5rem;
	}

	h2 {
		color: #ffe66d;
		margin-bottom: 0.5rem;
	}

	dl {
		background-color: #ffe66d;
		display: flex;
		margin: 0.5rem 3rem 1rem;
		padding: 1rem;
		border-radius: 0.5rem;
		border: #ff6b6b solid 1px;
	}

	.rate {
		font-size: 1.25rem;
	}
	dt {
		flex-basis: 15%;
		padding: 2px 0.25rem;
	}

	dd {
		flex-basis: 80%;
		flex-grow: 1;
		padding: 2px 0.25rem;
	}

	form {
		margin: 1.5rem auto 3rem;
		background: #4ecdc4;
		border: #1a535c solid 1px;
		padding: 1.5rem;
		border-radius: 1rem;
		width: 50%;
	}
	input {
		font-size: 1.563rem;
		border-radius: 0.5rem;
		border: #1a535c solid 1px;
		background: #f7fff7;
		padding: 0.25rem 0.25rem;
		margin-right: 0.5rem;
		width: 6rem;
	}
	button {
		font-size: 1.563rem;
		background: #ffe66d;
		border: #1a535c solid 2px;
		padding: 0.25rem 0.5rem;
		border-radius: 0.5rem;
		cursor: pointer;
	}

	.screen-reader-text {
		border: 0;
		clip: rect(1px, 1px, 1px, 1px);
		clip-path: inset(50%);
		height: 1px;
		margin: -1px;
		width: 1px;
		overflow: hidden;
		position: absolute !important;
		word-wrap: normal !important;
	}

	@media (max-width: 768px) {
		.content,
		form,
		.heading {
			width: auto;
			margin: 1.5rem;
		}
	}
</style>
