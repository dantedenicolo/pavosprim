import { Card, CardBody, CardFooter, useDisclosure } from "@nextui-org/react";
import BuyModal from "./BuyModal";
import { useState } from "react";

export default function Products({
	products,
	selectedCountry,
	selectedCurrency,
	selectedPaymentMethod,
	allProducts,
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleOpenBuyModal = (product) => {
		setSelectedProduct(product);
		onOpen();
	};
	return (
		<div className="flex flex-col items-center justify-center h-full w-full">
			{selectedPaymentMethod.toLowerCase() === "tarjeta" && (
				<div className="bg-purple-800 rounded-md p-5 mb-3 w-full sticky max-sm:w-[90vw]">
					<p className="text-white text-base font-semibold text-center">
						Todos los precios serán convertidos a tu moneda local al momento de
						pagar.
					</p>
				</div>
			)}
			<div className="overflow-auto max-h-[680px] max-sm:max-h-[420px]">
				<div className="grid grid-cols-2 sm:grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 flex-wrap">
					{products.map((product) => (
						<Card
							shadow="sm"
							key={product.id}
							isPressable
							className={
								"w-52 h-[330px] animate__animated animate__zoomIn animate__fast max-sm:w-44 max-sm:h-[250px]"
							}
							onPress={() => handleOpenBuyModal(product)}
						>
							<CardBody className="overflow-visible p-0">
								<img
									radius="lg"
									alt={product.name}
									className="w-full h-[200px] rounded-top-md object-cover"
									src={
										allProducts?.find((p) => p.id === product.productID).image
									}
								/>
							</CardBody>
							<CardFooter className="text-small justify-between">
								<b className="text-sm">{product.name}</b>
								<p className="text-default-500 text-sm">
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
					))}
				</div>
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
