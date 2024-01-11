export default function CurrencySelector({
	countries,
	selectedCountry,
	setSelectedCurrency,
}) {
	return (
		<>
			<h1 className="text-4xl max-md:text-2xl text-center font-bold">
				Selecciona tu moneda:
			</h1>
			<div className="flex flex-row items-center justify-center gap-2 mt-5 flex-wrap max-md:w-[400px]">
				{countries
					.find(
						(country) =>
							country.name.toLowerCase() === selectedCountry.toLowerCase()
					)
					.currencies.map((currency) => (
						<button
							className="flex flex-col items-center justify-center w-40 h-40 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
							onClick={() => setSelectedCurrency(currency)}
							key={currency}
						>
							<img
								src={`/${currency.toLowerCase()}.png`}
								alt={currency}
								className="w-20 h-20"
							/>
							<h1 className="text-xl font-bold text-white">{currency}</h1>
						</button>
					))}
			</div>
		</>
	);
}
