import { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";
import { createDiscountCodeByInstagram } from "../firebase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faCheckCircle,
	faGift,
	faXmarkCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function FreeVbucksModal({ isOpen, onOpenChange }) {
	const [instagram, setInstagram] = useState("");
	const [loading, setLoading] = useState(false);
	const [used, setUsed] = useState(null);
	const [code, setCode] = useState(null);
	const [error, setError] = useState(null);
	const [created, setCreated] = useState(false);

	const handleClaim = async () => {
		setLoading(true);
		const res = await createDiscountCodeByInstagram(
			// remove @ from instagram username
			instagram.replace("@", "").trim().toLowerCase()
		);
		if (res.error) {
			setError(res.errorCode);
			setCode(res.discountCode);
			setInstagram(res.instagram);
			setUsed(res.used);
			setLoading(false);
			setCreated(true);
			return;
		} else {
			setError(null);
			setCode(res.discountCode);
			setInstagram(res.instagram);
			setUsed(res.used);
			setLoading(false);
			setCreated(true);
			return;
		}
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				className="dark"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								<p>Obtén 2000 pavos gratis</p>
							</ModalHeader>
							<ModalBody>
								{created ? (
									<>
										{error ? (
											<>
												<FontAwesomeIcon
													icon={faGift}
													className="text-6xl text-yellow-400"
												/>
												<p className="text-center text-xl">
													<strong>¡Cupón ya reclamado!</strong>
												</p>
												<p className="text-center">
													El instagram ingresado ya ha reclamado su cupón de
													2000 pavos gratis.
												</p>
												<p className="text-center">
													Codigo: <strong className="uppercase">{code}</strong>
												</p>
												{used ? (
													<p className="text-center font-semibold flex flex-row items-center justify-center gap-1">
														El cupón ya ha sido usado{" "}
														<FontAwesomeIcon
															icon={faXmarkCircle}
															className="text-red-500 mt-[2px]"
														/>
													</p>
												) : (
													<p className="text-center font-semibold flex flex-row items-center justify-center gap-1">
														El cupón aún no ha sido usado{" "}
														<FontAwesomeIcon
															icon={faCheckCircle}
															className="text-green-500 mt-[2px]"
														/>
													</p>
												)}
											</>
										) : (
											<>
												<FontAwesomeIcon
													icon={faCheckCircle}
													className="text-6xl text-green-400"
												/>
												<p className="text-center text-xl">
													<strong>¡Cupón creado con éxito!</strong>
												</p>
												<p className="text-center">Tu código es:</p>
												<p className="text-center">
													<strong className="uppercase">{code}</strong>
												</p>
												<p className="text-center">
													Recuerda que para obtener tus 2000 pavos gratis, debes
													realizar una compra de 7800 pavos o más. Este cupón
													solo puede ser usado una vez y desde el usuario de
													Instagram <strong>@{instagram}</strong>.
												</p>
											</>
										)}
									</>
								) : (
									<>
										<p>
											Para obtener tus 2000 pavos gratis, debes seguir los
											siguientes pasos:
										</p>
										<ol className="list-decimal list-inside">
											<li>Ingresar tu usuario de Instagram</li>
											<li>Reclamar tu cupón (máximo 1 vez por usuario)</li>
											<li>
												Escribirnos por Instagram para confirmar tu cupón y
												realizar la carga
											</li>
										</ol>
										<p className="mt-2">
											<strong>Nota:</strong> El cupón solo puede ser reclamado
											una vez por usuario y contiene 2000 pavos gratis con tu
											compra de 7800 pavos o más.
										</p>
										<Input
											autoFocus
											label="Usuario de Instagram"
											placeholder="Ejemplo: @pavosprim"
											variant="bordered"
											value={instagram}
											onChange={(e) => setInstagram(e.target.value)}
										/>
									</>
								)}
							</ModalBody>
							<ModalFooter>
								{created ? (
									<Button
										color="secondary"
										onClick={() => {
											setCreated(false);
											setInstagram("");
											setCode(null);
											setUsed(null);
											setError(null);
											setLoading(false);
											onClose();
										}}
									>
										Cerrar
									</Button>
								) : (
									<>
										<Button color="danger" variant="flat" onPress={onClose}>
											Cancelar
										</Button>
										<Button
											color="secondary"
											onPress={handleClaim}
											isLoading={loading}
										>
											{loading ? "Reclamando..." : "Reclamar"}
										</Button>
									</>
								)}
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
