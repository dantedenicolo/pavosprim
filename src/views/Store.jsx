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
import { Image, Spinner, useDisclosure } from "@nextui-org/react";
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
	const [newItemShop, setNewItemShop] = useState(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		if (type === "fortnite") {
			if (currencyURL.toLowerCase() === "mxn") {
				setSelectedCurrency("MXN");
				setSelectedPaymentMethod("Transferencia / Oxxo");
				setSelectedCountry("Mexico");
			} else {
				setSelectedCurrency("ARS");
				setSelectedPaymentMethod("Transferencia / Efectivo");
				setSelectedCountry("Argentina");
			}
		} else if (type === "pavos") {
			if (currencyURL.toLowerCase() === "mxn") {
				setSelectedCurrency("MXN");
				setSelectedPaymentMethod("Transferencia / Oxxo");
				setSelectedCountry("Mexico");
			} else if (currencyURL.toLowerCase() === "ars") {
				setSelectedCurrency("ARS");
				setSelectedPaymentMethod("Transferencia / Efectivo");
				setSelectedCountry("Argentina");
			} else if (currencyURL.toLowerCase() === "usd") {
				setSelectedCurrency("USD");
				setSelectedPaymentMethod("DolarApp");
				setSelectedCountry("Otro");
			} else if (currencyURL.toLowerCase() === "global") {
				setSelectedCurrency("Moneda local");
				setSelectedPaymentMethod("Tarjeta");
				setSelectedCountry("Otro");
				setReady(true);
			} else {
				setSelectedCurrency("ARS");
				setSelectedPaymentMethod("Transferencia / Efectivo");
				setSelectedCountry("Argentina");
			}
		}
	}, [type, currencyURL]);

	const {
		isOpen: isOpenMonedaLocal,
		// onOpen: onOpenMonedaLocal,
		onOpenChange: onOpenChangeMonedaLocal,
	} = useDisclosure();

	useEffect(() => {
		if (type !== "fortnite") {
			if (type === "pavos") {
				if (ready) {
					if (selectedPaymentMethod === "Tarjeta") {
						onOpenChangeMonedaLocal();
					}
				}
			} else {
				if (selectedPaymentMethod === "Tarjeta") {
					onOpenChangeMonedaLocal();
				}
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [type, ready, selectedPaymentMethod]);

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

	const [pricesCorrected, setPricesCorrected] = useState(false);

	useEffect(
		() => {
			if (
				selectedCurrency === "USD" &&
				selectedPaymentMethod === "PayPal" &&
				products &&
				pricesCorrected === false
			) {
				setProducts(
					products.map((product) => {
						return {
							...product,
						};
					})
				);
				setPricesCorrected(true);
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[selectedCurrency, selectedPaymentMethod, products, pricesCorrected]
	);
	const [itemShopDate, setItemShopDate] = useState(null);
	const [newItemShopDate, setNewItemShopDate] = useState(null);

	const getItemShop = async (setItemShopFn, setItemShopDateFn) => {
		await axios
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
				const currentShopDate = res.data.lastUpdate.date.split(" ")[0];
				const allItems = res.data.shop
					.filter(
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
					)
					// filter duplicates
					.filter(
						(item, index, self) =>
							index ===
							self.findIndex(
								(t) =>
									t.displayName === item.displayName &&
									t.price.finalPrice === item.price.finalPrice
							)
					);

				const itemsMapped = allItems
					.filter((item) => item?.displayName !== null)
					.map((item) => {
						return {
							id: item?.mainId,
							displayName: item?.displayName,
							price:
								selectedCurrency === "MXN"
									? Math.ceil(
											itemPricesMXN.find(
												(price) =>
													price?.itemShopPrice === item?.price?.finalPrice
											)?.price * 3
									  )
									: Math.ceil(
											itemPrices.find(
												(price) =>
													price?.itemShopPrice === item?.price?.finalPrice
											)?.price * 3
									  ),
							image: item?.displayAssets.filter(
								(asset) => asset?.primaryMode !== "Juno"
							)[0]?.url,
							images: item?.displayAssets
								.filter((asset) => asset?.primaryMode !== "Juno")
								.map((image) => image?.url),
							background: item?.displayAssets[0]?.background_texture,
							giftAllowed: item?.giftAllowed,
							actualDate: new Date(),
							rarity: item?.rarity?.id,
							firstReleaseDate: item?.firstReleaseDate,
							currentShopDate: currentShopDate,
							isInRotation:
								item?.previousReleaseDate !== null &&
								item?.previousReleaseDate !==
									// currentShopDate minus 1 day
									new Date(
										new Date(currentShopDate).getTime() - 24 * 60 * 60 * 1000
									)
										.toISOString()
										.split("T")[0] &&
								item?.firstReleaseDate !== currentShopDate,
							daysSincePreviousRelease:
								(item?.previousReleaseDate &&
									Math.floor(
										(new Date(currentShopDate).getTime() -
											new Date(item?.previousReleaseDate).getTime()) /
											(1000 * 60 * 60 * 24)
									)) ||
								0,
						};
					});
				setItemShopFn(itemsMapped);
				setItemShopDateFn(currentShopDate);
			});
	};

	const [selectedTab, setSelectedTab] = useState("pavos");

	useEffect(() => {
		if (selectedCurrency) {
			getItemShop(setItemShop, setItemShopDate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCurrency]);

	useEffect(() => {
		if (itemShopDate) {
			setInterval(() => {
				const date = new Date().toISOString().split("T")[0];
				if (date > itemShopDate) {
					getItemShop(setNewItemShop, setNewItemShopDate);
				}
			}, 1000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [itemShopDate]);

	useEffect(() => {
		if (newItemShopDate && itemShopDate !== newItemShopDate) {
			setItemShop(null);
			setTimeout(() => {
				setItemShop(newItemShop);
				setItemShopDate(newItemShopDate);
				setSelectedTab("tienda");
			}, 1000);
		}
	}, [newItemShopDate, newItemShop, itemShopDate]);

	useEffect(() => {
		if (type !== "fortnite" && type !== "pavos") {
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
				{selectedCountry && type !== "fortnite" && type !== "pavos" && (
					<SelectedOptionsBarShop
						selectedCountry={selectedCountry}
						selectedCurrency={selectedCurrency}
						selectedPaymentMethod={selectedPaymentMethod}
						setSelectedCountry={setSelectedCountry}
						setSelectedCurrency={setSelectedCurrency}
						setSelectedPaymentMethod={setSelectedPaymentMethod}
						setProducts={setProducts}
						setPricesCorrected={setPricesCorrected}
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
									{type !== "fortnite" && type !== "pavos" ? (
										<>
											{/* <Tabs
										// 	aria-label="Method"
										// 	disabledKeys={
										// 		selectedCurrency !== "ARS" && selectedCurrency !== "MXN"
										// 			? ["tienda"]
										// 			: []
										// 	}
										// 	color="secondary"
										// 	selectedKey={selectedTab}
										// 	onSelectionChange={(key) => setSelectedTab(key)}
										// > */}
											{/* <Tab key="pavos" title="Pavos y Packs">
												<Products
													products={products}
													selectedCurrency={selectedCurrency}
													selectedCountry={selectedCountry}
													selectedPaymentMethod={selectedPaymentMethod}
													allProducts={allProducts}
												/>
											</Tab> */}

											{/* <Tab key="tienda" title="Tienda de Fortnite"> */}
											{selectedCurrency === "ARS" ||
											selectedCurrency === "MXN" ? (
												<ItemShop
													itemShop={itemShop}
													selectedCurrency={selectedCurrency}
													selectedCountry={selectedCountry}
													selectedPaymentMethod={selectedPaymentMethod}
												/>
											) : (
												<div className="flex flex-col items-center justify-center w-full h-[calc(100vh-350px)]">
													<p className="text-white text-center mx-5">
														Actualmente no estamos vendiendo ningún producto en
														la moneda que seleccionaste.
													</p>
												</div>
											)}
										</>
									) : // 	</Tab>
									// </Tabs>
									type === "fortnite" ? (
										<>
											<ItemShop
												itemShop={itemShop}
												selectedCurrency={selectedCurrency}
												selectedCountry={selectedCountry}
												selectedPaymentMethod={selectedPaymentMethod}
											/>
										</>
									) : (
										<>
											<Products
												products={products}
												selectedCurrency={selectedCurrency}
												selectedCountry={selectedCountry}
												selectedPaymentMethod={selectedPaymentMethod}
												allProducts={allProducts}
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
