export default function PaymentMethodSelector({
	paymentMethods,
	selectedCurrency,
	setSelectedPaymentMethod,
}) {
	return (
		<>
			<h1 className="max-md:text-2xl text-4xl text-center font-bold">
				Selecciona tu método de pago:
			</h1>
			<div className="flex flex-row items-center justify-center gap-2 mt-5 flex-wrap max-md:w-[400px]">
				{paymentMethods
					.find(
						(method) =>
							method.currency.toLowerCase() === selectedCurrency.toLowerCase()
					)
					.methods.map((method) => (
						<button
							className="flex flex-col items-center justify-center w-40 h-40 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
							onClick={() => setSelectedPaymentMethod(method)}
							key={method}
						>
							<img
								src={`/${method.toLowerCase()}.png`}
								alt={method}
								className="w-20 h-20"
							/>
							<h1 className="text-xl font-bold text-white">{method}</h1>
						</button>
					))}
			</div>
		</>
	);
}
