import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

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

	const [copied, setCopied] = useState(false);

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
								{item.displayName && (
									<div className="w-full bg-purple-700 text-white text-left p-2 rounded-md text-sm">
										Recorda que para comprar {item.displayName} debes tenernos
										agregados en todas nuestras 4 cuentas de Fortnite por un
										mínimo de 48hs. Nuestros IDs son: <br />
										<ul className="list-disc list-inside">
											<li>
												<b>PAVOSPRIM</b>
											</li>
											<li>
												<b>PAVOSPRIM2</b>
											</li>
											<li>
												<b>PAVOSPRIM3</b>
											</li>
											<li>
												<b>PAVOSPRIM4</b>
											</li>
										</ul>
									</div>
								)}

								<p>
									Para realizar la compra de {item.name || item.displayName}{" "}
									copia el siguiente mensaje y envíanoslo a nuestra cuenta de
									Instagram:
								</p>
								<div className=" w-full bg-[#333] text-white text-left p-3 rounded-md text-sm flex flex-row gap-1 items-center justify-between">
									<p className="text-md">
										{currency === "Moneda local"
											? "Hola! Quiero comprar " +
											  (item.name || item.displayName) +
											  " mediante pago con " +
											  paymentMethod +
											  " en moneda local."
											: "Hola! Quiero comprar " +
											  (item.name || item.displayName) +
											  " por $" +
											  item.price +
											  " " +
											  currency +
											  " mediante pago con " +
											  paymentMethod +
											  "."}
									</p>
									<CopyToClipboard
										text={
											currency === "Moneda local"
												? "Hola! Quiero comprar " +
												  (item.name || item.displayName) +
												  " mediante pago con " +
												  paymentMethod +
												  " en moneda local."
												: "Hola! Quiero comprar " +
												  (item.name || item.displayName) +
												  " por $" +
												  item.price +
												  " " +
												  currency +
												  " mediante pago con " +
												  paymentMethod +
												  "."
										}
										onCopy={() => {
											setCopied(true);
											setTimeout(() => {
												setCopied(false);
											}, 1500);
										}}
									>
										<FontAwesomeIcon
											icon={!copied ? faCopy : faCheck}
											size="lg"
											className={
												copied
													? "text-white"
													: "hover:text-[#cccccc] cursor-pointer transition duration-300 ease-in-out"
											}
										/>
									</CopyToClipboard>
								</div>

								<div className="flex flex-row gap-2 items-center justify-center w-full">
									<Button
										color="secondary"
										className="w-full"
										onPress={handleBuyInstagram}
									>
										Abrir chat de Instagram con PavosPrim
									</Button>
									{/* <Button
										color="success"
										className="w-1/2"
										isDisabled
										// onPress={handleBuyWhatsApp}
									>
										WhatsApp
									</Button> */}
								</div>
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
