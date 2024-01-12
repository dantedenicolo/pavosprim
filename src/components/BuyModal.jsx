import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

export default function BuyModal({
	isOpen,
	onOpenChange,
	item,
	currency,
	paymentMethod,
}) {
	const handleDismiss = () => {
		onOpenChange();
	};

	const handleBuyInstagram = () => {
		window.open("https://ig.me/m/pavosprim", "_blank");
	};

	// const handleBuyWhatsApp = () => {
	// 	currency === "Moneda local"
	// 		? window.open(
	// 				"https://wa.me/5491124011512?text=Hola!%20quiero%20comprar%20" +
	// 					(item.name || item.displayName) +
	// 					"%20mediante%20pago%20con%20" +
	// 					paymentMethod +
	// 					"%20en%20moneda%20local.",
	// 				"_blank"
	// 		  )
	// 		: window.open(
	// 				"https://wa.me/5491124011512?text=Hola!%20quiero%20comprar%20" +
	// 					(item.name || item.displayName) +
	// 					"%20por%20$" +
	// 					item.price +
	// 					"%20" +
	// 					currency +
	// 					"%20mediante%20pago%20con%20" +
	// 					paymentMethod +
	// 					".",
	// 				"_blank"
	// 		  );
	// };

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="dark"
				placement="center"
			>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Comprar {item.name || item.displayName}
							</ModalHeader>
							<ModalBody>
								<p>
									Selecciona el medio de comunicación por el cual deseas
									realizar la compra:
								</p>
								<div className="flex flex-row gap-2 items-center justify-center w-full">
									<Button
										color="secondary"
										className="w-1/2"
										onPress={handleBuyInstagram}
									>
										Instagram
									</Button>
									<Button
										color="success"
										className="w-1/2"
										isDisabled
										// onPress={handleBuyWhatsApp}
									>
										WhatsApp (No disponible)
									</Button>
								</div>
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onPress={handleDismiss}>
									Cancelar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
