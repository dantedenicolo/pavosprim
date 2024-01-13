import { Button, Select, SelectItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Precios() {
	useEffect(() => {
		document.title = "Precios - PavosPrim";
	}, []);
	const [selectedCountry, setSelectedCountry] = useState(null);
	const [selectedAmount, setSelectedAmount] = useState(null);
	const [currency, setCurrency] = useState(null);
	const [searchedAmount, setSearchedAmount] = useState(null);
	const [price, setPrice] = useState(null);
	const [loading, setLoading] = useState(false);

	const availableCountries = [
		{
			label: "Perú",
			value: "PEN",
		},
		{
			label: "Chile",
			value: "CLP",
		},
		{
			label: "Colombia",
			value: "COP",
		},
		{
			label: "Europa",
			value: "EUR",
		},
		{
			label: "Uruguay",
			value: "UYU",
		},
		{
			label: "Venezuela",
			value: "VES",
		},
		{
			label: "Paraguay",
			value: "PYG",
		},
		{
			label: "Bolivia",
			value: "BOB",
		},
		{
			label: "Brasil",
			value: "BRL",
		},
		{
			label: "Costa Rica",
			value: "CRC",
		},
		{
			label: "República Dominicana",
			value: "DOP",
		},
		{
			label: "Ecuador",
			value: "USD",
		},
	];

	const availableAmounts = [1000, 2000, 2800, 5000, 13500];

	const handleGetPrice = async () => {
		if (!selectedCountry || !selectedAmount) return;
		setLoading(true);
		setSearchedAmount(selectedAmount);
		const res = await axios.get(
			`https://api.pavosprim.com/prices/international?currency=${selectedCountry}&amount=${selectedAmount}`
		);
		setCurrency(res.data.currency);
		setPrice(res.data.precio);
		setLoading(false);
	};

	useEffect(() => {
		console.log(selectedCountry, selectedAmount);
	}, [selectedCountry, selectedAmount]);

	return (
		<main className="flex flex-col items-center justify-center h-[100svh]">
			<h1 className="text-4xl font-bold mt-2 max-md:text-3xl text-center">
				Obtener precios internacionales
			</h1>
			<div className="mt-4 flex flex-row items-center justify-center w-full gap-4 max-sm:p-3">
				<Select
					placeholder="Selecciona un país"
					value={selectedCountry}
					onChange={(v) => setSelectedCountry(v.target.value)}
					className="dark"
				>
					{availableCountries.map((country) => (
						<SelectItem
							key={country.value}
							value={country.value}
							className="text-gray-900"
						>
							{country.label}
						</SelectItem>
					))}
				</Select>
				<Select
					placeholder="Selecciona una cantidad"
					value={selectedAmount}
					onChange={(v) => setSelectedAmount(v.target.value)}
					className="dark"
				>
					{availableAmounts.map((amount) => (
						<SelectItem key={amount} value={amount} className="text-gray-900">
							{amount.toString() + " Pavos"}
						</SelectItem>
					))}
				</Select>
			</div>
			<Button
				color="secondary"
				auto
				className="dark font-semibold text-md mt-4 w-full max-sm:w-[362px]"
				onClick={handleGetPrice}
				isLoading={loading}
			>
				{loading
					? "Obteniendo precio..."
					: price &&
					  currency === selectedCountry &&
					  searchedAmount === selectedAmount
					? "Refrescar precio"
					: "Obtener precio"}
			</Button>
			{price && (
				<div className="mt-4 flex flex-col items-center justify-center w-full">
					<p className="dark text-xl font-semibold text-center max-md:text-md">
						${price} {currency}
					</p>
				</div>
			)}
		</main>
	);
}
