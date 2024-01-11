import { Card, CardBody, CardFooter, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import BuyModal from "./BuyModal";

export default function ItemShop({
	itemShop,
	selectedCountry,
	selectedCurrency,
	selectedPaymentMethod,
}) {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectedProduct, setSelectedProduct] = useState(null);

	const handleOpenBuyModal = (product) => {
		setSelectedProduct(product);
		onOpen();
	};
	return (
		<div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5 xl:gap-5 flex-wrap overflow-auto max-h-[680px] max-sm:max-h-[420px] max-sm:grid-cols-2">
			{itemShop.map((item) => (
				<Card
					shadow="sm"
					key={item.displayName}
					isPressable
					className="w-52 h-[330px] animate__animated animate__zoomIn animate__fast max-sm:w-44 max-sm:h-[250px]"
					onPress={() => handleOpenBuyModal(item)}
				>
					<CardBody className="overflow-visible p-0">
						<img
							radius="lg"
							alt={item.displayName}
							className="w-full max-sm:h-[200px] h-[277px] rounded-top-md object-cover"
							src={item.image}
						/>
					</CardBody>
					<CardFooter className="text-small justify-between">
						<b className="text-sm">{item.displayName}</b>
						<p className="text-default-500 text-sm">
							${" "}
							{selectedCountry === "Argentina" ? (
								<>
									{selectedPaymentMethod.toLowerCase() === "efectivo"
										? item.price + 200
										: item.price}{" "}
									{selectedCurrency}
								</>
							) : selectedCountry === "Colombia" ? (
								<>
									{item.price.toFixed(2)} USD
									{selectedPaymentMethod.toLowerCase() === "tarjeta" && (
										<p className="text-sm font-normal">Convertidos a COP</p>
									)}
								</>
							) : selectedCountry === "Otro" ? (
								<>
									{selectedPaymentMethod.toLowerCase() === "tarjeta"
										? (item.price / 910).toFixed(2)
										: item.price}{" "}
									USD
									<p className="text-sm font-normal">
										Convertidos a moneda local
									</p>
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
			/>
		</div>
	);
}
