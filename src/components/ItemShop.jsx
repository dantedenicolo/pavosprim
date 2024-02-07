import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Input,
	useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import BuyModal from "./BuyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCartArrowDown,
	faCartPlus,
	faSearch,
	faTrash,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function ItemShop({
	itemShop,
	selectedCountry,
	selectedCurrency,
	selectedPaymentMethod,
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchedItems, setSearchedItems] = useState(itemShop);
	const [searchBar, setSearchBar] = useState("");

	const handleOpenBuyModal = (product) => {
		setSelectedProduct(product);
		onOpen();
	};

	useEffect(() => {
		const intervalIds = [];

		searchedItems.forEach((item) => {
			let image = document.getElementById(item.id);
			if (image && item.images.length > 1) {
				const intervalId = setInterval(() => {
					let currentImage = image.getAttribute("src");
					let currentIndex = item.images.indexOf(currentImage);
					if (currentIndex === item.images.length - 1) {
						image.setAttribute("src", item.images[0]);
					} else {
						image.setAttribute("src", item.images[currentIndex + 1]);
					}
				}, 3000);
				intervalIds.push(intervalId);
			}
		});

		return () => {
			intervalIds.forEach((id) => clearInterval(id));
		};
	}, [searchedItems]);

	const posibleGradientColors = {
		uncommon: "linear-gradient(135deg, #197c05 0%, #00d800 100%)",
		rare: "linear-gradient(135deg, #044e97 0%, #00bfff 100%)",
		epic: "linear-gradient(135deg, #5f1691 0%, #c713c7 100%)",
		legendary: "linear-gradient(135deg, #8a4909 0%, #ffbf00 100%)",
		other: "linear-gradient(135deg, #680e0e 0%, #ff0000 100%)",
	};

	const [shoppingCart, setShoppingCart] = useState([]);

	const addToCart = (item) => {
		setShoppingCart([...shoppingCart, item]);
	};

	const removeFromCart = (item) => {
		setShoppingCart(shoppingCart.filter((cartItem) => cartItem.id !== item.id));
	};

	const emptyCart = () => {
		setShoppingCart([]);
	};

	return (
		<>
			<div className="flex flex-row items-center justify-center w-full pb-3">
				<Input
					type="text"
					placeholder="Buscar..."
					startContent={
						<FontAwesomeIcon icon={faSearch} className="text-gray-400" />
					}
					value={searchBar}
					endContent={
						searchBar !== "" && (
							<FontAwesomeIcon
								icon={faXmark}
								className="text-gray-400 cursor-pointer"
								onClick={() => {
									setSearchedItems(itemShop);
									setSearchBar("");
								}}
							/>
						)
					}
					className={
						"w-[270px] " +
						(shoppingCart.length > 0 ? "max-md:w-[190px]" : "max-md:w-[220px]")
					}
					size="xs"
					onChange={(e) => {
						setSearchBar(e.target.value);
						if (e.target.value === "") {
							setSearchedItems(itemShop);
						} else {
							setSearchedItems(
								itemShop.filter((item) =>
									item.displayName
										.toLowerCase()
										.includes(e.target.value.toLowerCase())
								)
							);
						}
					}}
				/>
				<Button
					color="secondary"
					className="ml-2"
					onClick={() => {
						if (shoppingCart.length === 0) return;
						setSelectedProduct({
							displayName: shoppingCart
								.map((item) => item.displayName)
								// join with commas or "y" if last item
								.join(", ")
								.replace(/,(?=[^,]*$)/, " y"),
							price: itemShop
								.filter((item) =>
									shoppingCart.map((cartItem) => cartItem.id).includes(item.id)
								)
								.reduce(
									(acc, item) =>
										acc +
										(selectedCountry === "Argentina"
											? selectedPaymentMethod.toLowerCase() === "efectivo"
												? item.price + 200
												: item.price
											: item.price),
									0
								),
							images: shoppingCart.map((item) => item.images[0]),
							id: "cart",
							quantity: shoppingCart.length,
						});
						onOpen();
					}}
				>
					{shoppingCart.length > 0
						? "Comprar " + shoppingCart.length + " items"
						: "Carrito vacío"}
					<FontAwesomeIcon icon={faCartArrowDown} />
				</Button>
			</div>
			{searchedItems.length === 0 && (
				<p className="text-white text-md font-semibold text-center">
					No se encontraron resultados.
				</p>
			)}
			<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 flex-wrap overflow-auto max-sm:grid-cols-2">
				{searchedItems
					.sort((a, b) => b.price - a.price)
					.map((item) => (
						<Card
							shadow="sm"
							key={item.displayName}
							isPressable
							className="w-52 h-[330px] animate__animated animate__zoomIn animate__fast max-sm:w-44 max-sm:h-[250px]"
						>
							<CardBody className="overflow-visible p-0">
								{/* rotating image with all item.images */}
								<img
									radius="lg"
									alt={item.displayName}
									className="w-full max-sm:h-[200px] h-[277px] rounded-top-md object-cover"
									src={item?.images[0] || "/no-image.png"}
									id={item.id}
									onClick={() =>
										handleOpenBuyModal({
											id: item.id,
											displayName: item.displayName,
											images: item.images,

											price:
												selectedCountry === "Argentina"
													? selectedPaymentMethod.toLowerCase() === "efectivo"
														? item.price + 200
														: item.price
													: item.price,
										})
									}
									style={{
										backgroundImage: item.background
											? `url(${item.background})`
											: null,
										backgroundSize: "cover",
										backgroundPosition: "center",
										// if no background image, make a gradient
										background: !item.background
											? posibleGradientColors[item?.rarity?.toLowerCase()] ||
											  posibleGradientColors["other"]
											: `url(${item.background})`,
									}}
								/>
								{item.firstReleaseDate === item.currentShopDate && (
									<div className="absolute top-0 right-0 bg-yellow-400 text-black text-sm font-bold px-1 rounded-bl-md max-md:text-xs z-50">
										Primera vez en la tienda!
									</div>
								)}
								{item.isInRotation && (
									<div
										className={
											"absolute top-0 right-0 text-black text-sm font-bold px-1 rounded-bl-md max-md:text-xs z-50 " +
											(item.daysSincePreviousRelease < 30
												? "bg-green-400"
												: item.daysSincePreviousRelease < 60
												? "bg-yellow-400"
												: item.daysSincePreviousRelease < 120
												? "bg-orange-400"
												: item.daysSincePreviousRelease < 300
												? "bg-red-400"
												: item.daysSincePreviousRelease < 360
												? "animate-gradient"
												: "animate-gradient-2")
										}
									>
										Volvió después de {item.daysSincePreviousRelease} días
									</div>
								)}
								<div className="relative">
									<div
										className="absolute bottom-0 right-0 bg-gray-800 text-md font-bold px-1 rounded-md max-md:text-sm m-2 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition ease-in-out duration-250"
										onClick={(e) => {
											// prevent the card from opening the modal
											e.stopPropagation();
											if (
												shoppingCart.find((cartItem) => cartItem.id === item.id)
											) {
												removeFromCart(item);
											} else {
												addToCart({
													...item,
													price:
														selectedCountry === "Argentina"
															? selectedPaymentMethod.toLowerCase() ===
															  "efectivo"
																? item.price + 200
																: item.price
															: item.price,
												});
											}
										}}
									>
										<FontAwesomeIcon
											icon={
												shoppingCart.find((cartItem) => cartItem.id === item.id)
													? faTrash
													: faCartPlus
											}
											className="text-white p-2"
										/>
									</div>
								</div>
							</CardBody>
							<CardFooter
								className="text-small justify-between"
								onClick={() =>
									handleOpenBuyModal({
										id: item.id,
										displayName: item.displayName,
										images: item.images,

										price:
											selectedCountry === "Argentina"
												? selectedPaymentMethod.toLowerCase() === "efectivo"
													? item.price + 200
													: item.price
												: item.price,
									})
								}
							>
								<b className="text-sm text-white font-normal">
									{item.displayName}
								</b>
								<p className="text-white font-bold text-sm">
									${" "}
									{selectedCountry === "Argentina" ? (
										<>
											{selectedPaymentMethod.toLowerCase() === "efectivo"
												? item.price + 200
												: item.price}{" "}
											{selectedCurrency}
										</>
									) : selectedCountry === "Colombia" ? (
										<>{item.price.toFixed(2)} USD</>
									) : selectedCountry === "Otro" ? (
										<>
											{selectedPaymentMethod.toLowerCase() === "tarjeta"
												? (item.price / 910).toFixed(2)
												: item.price}{" "}
											USD
										</>
									) : (
										<>
											{item.price} {selectedCurrency}
										</>
									)}
								</p>
							</CardFooter>
						</Card>
					))}
				<BuyModal
					isOpen={isOpen}
					onOpenChange={onOpenChange}
					item={selectedProduct}
					currency={selectedCurrency}
					paymentMethod={selectedPaymentMethod}
					addToCart={addToCart}
					shoppingCart={shoppingCart}
					removeFromCart={removeFromCart}
					emptyCart={emptyCart}
				/>
			</div>
		</>
	);
}
