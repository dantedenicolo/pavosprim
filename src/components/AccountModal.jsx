import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Input,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

export default function AccountModal({
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
		window.open("https://ig.me/m/cuentasprim_", "_blank");
	};

	const [message, setMessage] = useState("");

	const [platform, setPlatform] = useState(null);
	const [wantToContinue, setWantToContinue] = useState(false);
	const [hasXboxAccount, setHasXboxAccount] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [generatedMessage, setGeneratedMessage] = useState(false);
	const [copied, setCopied] = useState(false);
	useEffect(() => {
		if (item) {
			setMessage(
				"Para realizar la compra de " +
					item?.name +
					", completa los siguientes campos:"
			);
		}
	}, [item]);

	useEffect(() => {
		if (generatedMessage) {
			setMessage(
				"Para realizar la compra de " +
					item?.name +
					", copia el siguiente mensaje y envíanoslo a nuestra cuenta de Instagram:"
			);
		}
	}, [generatedMessage, item]);

	useEffect(() => {
		const platform = localStorage.getItem("platform");
		const email = localStorage.getItem("email");
		const password = localStorage.getItem("password");
		const hasXboxAccount = localStorage.getItem("hasXboxAccount");
		const wantToContinue = localStorage.getItem("wantToContinue");
		const generatedMessage = localStorage.getItem("generatedMessage");
		if (platform && email && password && hasXboxAccount !== null) {
			setPlatform(platform);
			setEmail(email);
			setPassword(password);
			setHasXboxAccount(hasXboxAccount === "true");
			setWantToContinue(wantToContinue === "true");
			setGeneratedMessage(generatedMessage === "true");
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("platform", platform);
	}, [platform]);

	useEffect(() => {
		localStorage.setItem("email", email);
	}, [email]);

	useEffect(() => {
		localStorage.setItem("password", password);
	}, [password]);

	useEffect(() => {
		localStorage.setItem("hasXboxAccount", hasXboxAccount);
	}, [hasXboxAccount]);

	useEffect(() => {
		localStorage.setItem("wantToContinue", wantToContinue);
	}, [wantToContinue]);

	useEffect(() => {
		localStorage.setItem("generatedMessage", generatedMessage);
	}, [generatedMessage]);

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
								Comprar{" "}
								{item?.id === "cart"
									? item?.quantity > 1
										? item?.quantity + " items" + " en el carrito"
										: item?.quantity + " item" + " en el carrito"
									: item.name || item.displayName}
							</ModalHeader>
							<ModalBody>
								<p>{message}</p>

								{!generatedMessage && (
									<div className="flex flex-col gap-2 items-start justify-start w-full">
										<p>Selecciona la plataforma de tu cuenta:</p>
										<Select
											onChange={(e) => {
												setPlatform(e.target.value);
												if (e.target.value !== "Nintendo") {
													setWantToContinue(true);
												}
												if (e.target.value === "Xbox") {
													setHasXboxAccount(true);
												}
											}}
											selectedKeys={platform ? [platform] : []}
											className="dark"
											label="Plataforma"
											placeholder="Selecciona una plataforma"
											size="sm"
										>
											<SelectItem
												className="text-black"
												value="Epic Games"
												key="Epic Games"
											>
												Epic Games
											</SelectItem>
											<SelectItem
												className="text-black"
												value="Xbox"
												key="Xbox"
											>
												Xbox
											</SelectItem>
											<SelectItem
												className="text-black"
												value="PlayStation"
												key="PlayStation"
											>
												PlayStation
											</SelectItem>
											<SelectItem
												className="text-black"
												value="Nintendo"
												key="Nintendo"
											>
												Nintendo
											</SelectItem>
										</Select>

										{platform === "Nintendo" && (
											<>
												<p>
													La carga de pavos y Packs no se verán reflejadas en
													Nintendo, pero si en todas las demás plataformas.
													¿Deseas continuar con la compra?
												</p>
												<RadioGroup
													value={wantToContinue}
													onValueChange={setWantToContinue}
													className="dark"
													orientation="horizontal"
												>
													<Radio value={true}>Sí</Radio>
													<Radio value={false}>No</Radio>
												</RadioGroup>
											</>
										)}

										{platform && wantToContinue && (
											<>
												{platform !== "Xbox" && (
													<>
														<p>¿Tenés cuenta de Xbox vinculada?</p>
														<RadioGroup
															value={hasXboxAccount}
															onValueChange={setHasXboxAccount}
															className="dark"
															orientation="horizontal"
														>
															<Radio value={true}>Sí</Radio>
															<Radio value={false}>No</Radio>
														</RadioGroup>
													</>
												)}
												<p>
													Ingresa el correo electrónico de tu cuenta de{" "}
													{hasXboxAccount ? "Xbox" : platform}:
												</p>
												<Input
													type="email"
													placeholder="Correo electrónico"
													value={email}
													onValueChange={setEmail}
													size="xs"
												/>

												<p>
													Ingresa la contraseña de tu cuenta de{" "}
													{hasXboxAccount ? "Xbox" : platform}:
												</p>
												<Input
													type="password"
													placeholder="Contraseña"
													value={password}
													onValueChange={setPassword}
													size="xs"
												/>
												<Button
													color="secondary"
													className="w-full mt-2"
													onPress={() => {
														if (email.trim() === "" || password.trim() === "") {
															alert("Por favor, completa todos los campos.");
															return;
														}
														setGeneratedMessage(true);
														setMessage(
															"Para realizar la compra de " +
																item?.name +
																", copia el siguiente mensaje y envíanoslo a nuestra cuenta de Instagram:"
														);
													}}
												>
													Generar mensaje
												</Button>
											</>
										)}
									</div>
								)}
								{generatedMessage && (
									<>
										<div className=" w-full bg-[#333] text-white text-left p-3 rounded-md text-sm flex flex-row gap-1 items-center justify-between">
											{currency === "Moneda local" ? (
												<p className="text-md">
													Hola! Quiero comprar{" "}
													{(item.name || item.displayName) +
														(item?.quantity > 1
															? " (" + item?.quantity + " items )"
															: " ")}
													mediante pago con {paymentMethod} en moneda local. Los
													datos de mi cuenta de{" "}
													{hasXboxAccount ? "Xbox" : platform} son: <br />
													Correo: {email} <br />
													Contraseña: {password}
												</p>
											) : (
												<p className="text-md">
													Hola! Quiero comprar{" "}
													{(item.name || item.displayName) +
														(item?.quantity > 1
															? " (" + item?.quantity + " items) "
															: " ")}{" "}
													por ${item.price} {currency} mediante pago con{" "}
													{paymentMethod}. Los datos de mi cuenta de{" "}
													{hasXboxAccount ? "Xbox" : platform} son: <br />
													Correo: {email} <br />
													Contraseña: {password}
												</p>
											)}
											<CopyToClipboard
												text={
													currency === "Moneda local"
														? "Hola! Quiero comprar " +
														  (item.name || item.displayName) +
														  (item?.quantity > 1
																? " (" + item?.quantity + " items)"
																: "") +
														  " mediante pago con " +
														  paymentMethod +
														  " en moneda local. Los datos de mi cuenta de " +
														  (hasXboxAccount ? "Xbox" : platform) +
														  " son: \nCorreo: " +
														  email +
														  "\nContraseña: " +
														  password
														: "Hola! Quiero comprar " +
														  (item.name || item.displayName) +
														  (item?.quantity > 1
																? " (" + item?.quantity + " items)"
																: "") +
														  " por $" +
														  item.price +
														  " " +
														  currency +
														  " mediante pago con " +
														  paymentMethod +
														  ". Los datos de mi cuenta de " +
														  (hasXboxAccount ? "Xbox" : platform) +
														  " son: \nCorreo: " +
														  email +
														  "\nContraseña: " +
														  password
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
															? "text-white ml-2"
															: "hover:text-[#cccccc] cursor-pointer transition duration-300 ease-in-out ml-2"
													}
												/>
											</CopyToClipboard>
										</div>
										<div className="flex flex-col gap-2 items-center justify-center w-full">
											<Button
												color="secondary"
												className="w-full"
												onPress={handleBuyInstagram}
											>
												Abrir chat de Instagram con PavosPrim
											</Button>
											<Button
												color="secondary"
												className="w-full"
												onPress={() => {
													setGeneratedMessage(false);
												}}
											>
												Deseo cambiar los datos de mi cuenta
											</Button>
										</div>
									</>
								)}
							</ModalBody>
							<ModalFooter>
								<div className="flex flex-row-reverse gap-2 items-center w-full justify-between">
									<Button color="secondary" onPress={handleDismiss}>
										Cerrar
									</Button>
								</div>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
