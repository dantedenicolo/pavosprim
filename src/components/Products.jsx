import { Card, CardBody, CardFooter, useDisclosure } from "@nextui-org/react";
import BuyModal from "./BuyModal";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function Products({
	products,
	selectedCountry,
	selectedCurrency,
	selectedPaymentMethod,
	allProducts,
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [searchedProducts, setSearchedProducts] = useState(products);
	const [searchBar, setSearchBar] = useState("");

	const handleOpenBuyModal = (product) => {
		setSelectedProduct(product);
		onOpen();
	};

	return (
		<div className="flex flex-col items-center justify-center h-full w-full">
			<div className="flex flex-row items-center justify-center w-full pb-3">
				<Input
					type="text"
					value={searchBar}
					placeholder="Buscar..."
					startContent={
						<FontAwesomeIcon icon={faSearch} className="text-gray-400" />
					}
					endContent={
						searchBar !== "" && (
							<FontAwesomeIcon
								icon={faXmark}
								className="text-gray-400 cursor-pointer"
								onClick={() => {
									setSearchedProducts(products);
									setSearchBar("");
								}}
							/>
						)
					}
					className="w-[270px]"
					size="xs"
					onChange={(e) => {
						setSearchBar(e.target.value);
						if (e.target.value === "") {
							setSearchedProducts(products);
						} else {
							setSearchedProducts(
								products.filter(
									(product) =>
										product.name
											.toLowerCase()
											.includes(e.target.value.toLowerCase()) ||
										product.category
											.toLowerCase()
											.includes(e.target.value.toLowerCase())
								)
							);
						}
					}}
				/>
			</div>
			{searchedProducts.length === 0 && (
				<p className="text-white text-md font-semibold text-center">
					No se encontraron resultados.
				</p>
			)}

			<div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 flex-wrap w-full justify-center items-center">
				{searchedProducts
					// sort by category and price inside category
					.sort((a, b) => {
						if (a.category < b.category) return 1;
						if (a.category > b.category) return -1;
						if (a.category === b.category) {
							if (a.price > b.price) return 1;
							if (a.price < b.price) return -1;
						}
						return 0;
					})
					.map((product) => (
						<div
							className="flex flex-col items-center justify-center"
							key={product.id}
						>
							<Card
								shadow="sm"
								isPressable
								className={
									"w-52 h-[330px] animate__animated animate__zoomIn animate__fast max-sm:w-44 max-sm:h-[250px]"
								}
								onPress={() => handleOpenBuyModal(product)}
							>
								<CardBody className="overflow-visible p-0">
									{product.category === "combos" && (
										<div className="absolute top-0 right-0 bg-red-600 rounded-bl-md rounded-tr-md p-1 ">
											<p className="text-white text-md font-bold">
												{product.discount}% OFF
											</p>
										</div>
									)}
									<img
										radius="lg"
										alt={product.name}
										className="w-full max-sm:h-[200px] rounded-top-md object-cover h-[277px]"
										src={
											allProducts?.find((p) => p.id === product.productID).image
										}
									/>
								</CardBody>
								<CardFooter className="text-small justify-between">
									<b className="text-sm text-white font-normal">
										{product.name}
									</b>
									<p className="text-white text-sm font-bold">
										${" "}
										{selectedCountry === "Argentina" ? (
											<>
												{selectedPaymentMethod.toLowerCase() === "efectivo"
													? product.price + 200
													: product.price}{" "}
												{selectedCurrency}
											</>
										) : selectedCountry === "Colombia" ? (
											<>
												{selectedPaymentMethod.toLowerCase() === "tarjeta"
													? (product.price / 910).toFixed(2)
													: product.price}{" "}
											</>
										) : selectedCountry === "Otro" ? (
											<>
												{selectedPaymentMethod.toLowerCase() === "tarjeta"
													? (product.price / 910).toFixed(2)
													: product.price}{" "}
												USD
											</>
										) : (
											<>
												{product.price} {selectedCurrency}
											</>
										)}
									</p>
								</CardFooter>
							</Card>
						</div>
					))}
			</div>
			<BuyModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				item={selectedProduct}
				paymentMethod={selectedPaymentMethod}
				currency={selectedCurrency}
			/>
		</div>
	);
}
