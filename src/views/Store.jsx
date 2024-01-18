import {
	ContainerBox,
	CountrySelector,
	CurrencySelector,
	ItemShop,
	PaymentMethodSelector,
	Products,
	SelectedOptionsBarShop,
	MonedaLocalModal,
} from "../components";
import { useEffect, useState } from "react";
import { getProductsByStoreType, getAllProducts } from "../firebase/client";
import { Button, Image, Spinner, useDisclosure } from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import axios from "axios";
import {
	paymentMethods,
	countries,
	itemPrices,
	itemPricesMXN,
} from "../utils/store";
import { Link } from "react-router-dom";

export default function Store({ type, currencyURL }) {
	useEffect(() => {
		document.title = "Tienda - PavosPrim";
	}, []);
	const localStorage = window.localStorage;
	const [selectedCountry, setSelectedCountry] = useState(
		localStorage.getItem("selectedCountry") || null
	);
	const [selectedCurrency, setSelectedCurrency] = useState(
		currencyURL === "MXN"
			? "MXN"
			: currencyURL === "ARS"
			? "ARS"
			: localStorage.getItem("selectedCurrency") || null
	);
	const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
		localStorage.getItem("selectedPaymentMethod") || null
	);
	const [products, setProducts] = useState(null);
	const [allProducts, setAllProducts] = useState(null);

	const [itemShop, setItemShop] = useState(null);

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	useEffect(() => {
		if (type === "fortnite") {
			if (currencyURL === "MXN") {
				setSelectedCurrency("MXN");
				setSelectedPaymentMethod("Transferencia / Oxxo");
			} else {
				setSelectedCurrency("ARS");
				setSelectedPaymentMethod("Transferencia / Efectivo");
			}
		}
	}, [type, currencyURL]);

	const {
		isOpen: isOpenMonedaLocal,
		// onOpen: onOpenMonedaLocal,
		onOpenChange: onOpenChangeMonedaLocal,
	} = useDisclosure();

	useEffect(() => {
		if (selectedPaymentMethod === "Tarjeta") {
			onOpenChangeMonedaLocal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPaymentMethod]);

	useEffect(() => {
		if (selectedPaymentMethod === "Tarjeta") {
			onOpenChangeMonedaLocal();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedPaymentMethod]);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let unsubscribe;
		if (selectedPaymentMethod) {
			const paywall = paymentMethods.find(
				(method) => method.currency === selectedCurrency
			).paywall;
			unsubscribe = getProductsByStoreType(paywall, setProducts);
		}
		return () => unsubscribe && unsubscribe();
	}, [selectedPaymentMethod, selectedCurrency]);

	useEffect(() => {
		if (selectedPaymentMethod) {
			if (products) {
				setLoading(false);
			} else {
				setLoading(true);
			}
		} else {
			setLoading(false);
		}
	}, [products, selectedPaymentMethod]);

	useEffect(() => {
		let unsubscribe;
		unsubscribe = getAllProducts(setAllProducts);
		return () => unsubscribe && unsubscribe();
	}, []);

	useEffect(() => {
		axios
			.get(
				"https://fortniteapi.io/v2/shop?lang=es",
				// pass auth headers
				{
					headers: {
						Authorization: "9f6ff8f9-6f016542-401d6ea0-fcb48f5d",
					},
				}
			)
			.then((res) => {
				const allItems = res.data.shop.filter(
					(item) =>
						item.giftAllowed &&
						// item.price.finalPrice === 100 ||
						(item.price.finalPrice === 200 ||
							item.price.finalPrice === 300 ||
							item.price.finalPrice === 400 ||
							item.price.finalPrice === 500 ||
							item.price.finalPrice === 600 ||
							item.price.finalPrice === 700 ||
							item.price.finalPrice === 800 ||
							item.price.finalPrice === 900 ||
							item.price.finalPrice === 1000 ||
							item.price.finalPrice === 1100 ||
							item.price.finalPrice === 1200 ||
							item.price.finalPrice === 1300 ||
							item.price.finalPrice === 1400 ||
							item.price.finalPrice === 1500 ||
							item.price.finalPrice === 1600 ||
							item.price.finalPrice === 1700 ||
							item.price.finalPrice === 1800 ||
							item.price.finalPrice === 1900 ||
							item.price.finalPrice === 2000 ||
							item.price.finalPrice === 2100 ||
							item.price.finalPrice === 2200 ||
							item.price.finalPrice === 2300 ||
							item.price.finalPrice === 2400 ||
							item.price.finalPrice === 2500 ||
							item.price.finalPrice === 2600 ||
							item.price.finalPrice === 2700 ||
							item.price.finalPrice === 2800 ||
							item.price.finalPrice === 2900 ||
							item.price.finalPrice === 3000)
				);
				const itemsMapped = allItems.map((item) => {
					return {
						id: item.mainId,
						displayName: item.displayName,
						price:
							selectedCurrency === "MXN"
								? itemPricesMXN.find(
										(price) => price.itemShopPrice === item.price.finalPrice
								  )?.price
								: itemPrices.find(
										(price) => price.itemShopPrice === item.price.finalPrice
								  )?.price,
						image: item.displayAssets[0].url,
						images: item.displayAssets.map((image) => image.url),
						background: item.displayAssets[0].background_texture,
						giftAllowed: item.giftAllowed,
						actualDate: new Date(),
						rarity: item.rarity.id,
						firstReleaseDate: item.firstReleaseDate,
					};
				});
				setItemShop(itemsMapped);
			});
	}, [selectedCurrency]);

	useEffect(() => {
		if (type !== "fortnite") {
			if (selectedCountry) {
				localStorage.setItem("selectedCountry", selectedCountry);
			} else {
				localStorage.removeItem("selectedCountry");
			}
			if (selectedCurrency) {
				localStorage.setItem("selectedCurrency", selectedCurrency);
			} else {
				localStorage.removeItem("selectedCurrency");
			}
			if (selectedPaymentMethod) {
				localStorage.setItem("selectedPaymentMethod", selectedPaymentMethod);
			} else {
				localStorage.removeItem("selectedPaymentMethod");
			}
		}
	}, [
		selectedCountry,
		selectedCurrency,
		selectedPaymentMethod,
		localStorage,
		type,
	]);

	return (
		<>
			<ContainerBox>
				<Link to="/">
					<Image
						src="/logo.png"
						width={100}
						height={100}
						className="max-md:w-[75px] max-md:h-[75px]"
					/>
				</Link>
				{selectedCountry && type !== "fortnite" && (
					<SelectedOptionsBarShop
						selectedCountry={selectedCountry}
						selectedCurrency={selectedCurrency}
						selectedPaymentMethod={selectedPaymentMethod}
						setSelectedCountry={setSelectedCountry}
						setSelectedCurrency={setSelectedCurrency}
						setSelectedPaymentMethod={setSelectedPaymentMethod}
						setProducts={setProducts}
					/>
				)}

				<main className="flex flex-col items-center justify-start mt-4 w-full h-full">
					{(!selectedCountry ||
						!selectedCurrency ||
						!selectedPaymentMethod) && (
						<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-350px)]">
							{!selectedCountry && (
								<CountrySelector
									setSelectedCountry={setSelectedCountry}
									selectedCountry={selectedCountry}
								/>
							)}
							{selectedCountry && !selectedCurrency && (
								<CurrencySelector
									countries={countries}
									selectedCountry={selectedCountry}
									setSelectedCurrency={setSelectedCurrency}
								/>
							)}
							{selectedCountry &&
								selectedCurrency &&
								!selectedPaymentMethod && (
									<PaymentMethodSelector
										paymentMethods={paymentMethods}
										selectedCurrency={selectedCurrency}
										setSelectedPaymentMethod={setSelectedPaymentMethod}
									/>
								)}
						</div>
					)}

					{selectedCountry && selectedCurrency && selectedPaymentMethod && (
						<>
							{loading || !products || !itemShop ? (
								<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-350px)]">
									<Spinner color="secondary" />
								</div>
							) : (
								<>
									{type !== "fortnite" ? (
										<Tabs
											aria-label="Method"
											disabledKeys={
												selectedCurrency !== "ARS" && selectedCurrency !== "MXN"
													? ["tienda"]
													: []
											}
											color="secondary"
										>
											<Tab key="pavos" title="Pavos y Packs">
												<Products
													products={products}
													selectedCurrency={selectedCurrency}
													selectedCountry={selectedCountry}
													selectedPaymentMethod={selectedPaymentMethod}
													allProducts={allProducts}
												/>
											</Tab>

											<Tab key="tienda" title="Tienda de Fortnite">
												{(selectedCurrency === "ARS" ||
													selectedCurrency === "MXN") && (
													<ItemShop
														itemShop={itemShop}
														selectedCurrency={selectedCurrency}
														selectedCountry={selectedCountry}
														selectedPaymentMethod={selectedPaymentMethod}
													/>
												)}
											</Tab>
										</Tabs>
									) : (
										<>
											<ItemShop
												itemShop={itemShop}
												selectedCurrency={selectedCurrency}
												selectedCountry={selectedCountry}
												selectedPaymentMethod={selectedPaymentMethod}
											/>
										</>
									)}
								</>
							)}
						</>
					)}
				</main>
				<MonedaLocalModal
					isOpen={isOpenMonedaLocal}
					onOpenChange={onOpenChangeMonedaLocal}
				/>
			</ContainerBox>
		</>
	);
}
