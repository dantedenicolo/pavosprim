import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";

export default function WelcomeModal({ isOpen, onOpenChange }) {
	const handleDismiss = () => {
		localStorage.setItem("dismissed", true);
		onOpenChange();
	};
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
								Bienvenido a PavosPrim
							</ModalHeader>
							<ModalBody>
								<p>
									En nuestra página web podrás encontrar todos nuestros precios
									actualizados. Recuerda que las ventas se realizan a través de
									nuestro Instagram y WhatsApp oficial.
								</p>
								<p className="bg-purple-700 rounded-md p-3 text-center">
									No olvides utilizar el código{" "}
									<span className="font-bold">PRIMPUCHO</span> en la tienda de
									Fortnite ya que nos ayuda un montón.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="secondary" onPress={handleDismiss}>
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
