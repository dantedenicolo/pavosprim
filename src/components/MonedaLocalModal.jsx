import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

export default function MonedaLocalModal({ isOpen, onOpenChange }) {
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="dark"
				placement="center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Pagos en moneda local
							</ModalHeader>
							<ModalBody>
								<p>
									Has seleccionado Moneda Local como método de pago. A
									continuación verás todos los precios en USD. Sin embargo, al
									momento de pagar, el precio se convertirá a tu moneda local.
									Para saber cual será la conversión aproximada, ingresa a{" "}
									<a
										href="https://pavosprim.com/precios"
										target="_blank"
										rel="noreferrer"
										className="text-purple-500 underline hover:text-purple-600 transition duration-300 ease-in-out"
									>
										www.pavosprim.com/precios
									</a>{" "}
									y selecciona tu país y junto a la cantidad de pavos que deseas
									comprar.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onPress={onClose}>
									Cerrar
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
