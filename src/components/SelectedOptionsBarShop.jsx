import { Button } from "@nextui-org/react";

export default function SelectedOptionsBarShop({
	selectedCountry,
	selectedCurrency,
	selectedPaymentMethod,
	setSelectedCountry,
	setSelectedCurrency,
	setSelectedPaymentMethod,
	setProducts,
}) {
	return (
		<>
			<div className="flex flex-row justify-center items-center gap-3 mt-3">
				{selectedCountry && !selectedCurrency && !selectedPaymentMethod && (
					<Button
						auto
						size="small"
						onClick={() => {
							setSelectedCountry(null);
							setProducts(null);
						}}
						color="secondary"
					>
						Cambiar país ({selectedCountry})
					</Button>
				)}
				{selectedCurrency && !selectedPaymentMethod && (
					<Button
						auto
						size="small"
						onClick={() => {
							setSelectedCurrency(null);
							setProducts(null);
						}}
						color="secondary"
					>
						Cambiar moneda ({selectedCurrency})
					</Button>
				)}
				{selectedPaymentMethod && (
					<Button
						auto
						size="small"
						onClick={() => {
							setSelectedPaymentMethod(null);
							setSelectedCurrency(null);
							setSelectedCountry(null);
							setProducts(null);
						}}
						color="secondary"
					>
						Volver al menú
					</Button>
				)}
			</div>
		</>
	);
}
