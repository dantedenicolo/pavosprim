import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { claimCode } from "../firebase/client";

export default function ClaimCode() {
	const [code, setCode] = useState(null);
	const [instagram, setInstagram] = useState(null);
	const [loading, setLoading] = useState(false);
	const [sentPetition, setSentPetition] = useState(false);
	const [errorCode, setErrorCode] = useState(null);

	const handleClaimCode = async () => {
		setLoading(true);
		const res = await claimCode(code, instagram);
		if (res.error) {
			setErrorCode(res.errorCode);
			setSentPetition(true);
			setLoading(false);
		} else {
			setErrorCode(null);
			setSentPetition(true);
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center justify-center w-[400px] max-sm:w-full max-sm:p-3">
			{sentPetition ? (
				<div className="flex flex-col items-center justify-center w-full">
					{errorCode ? (
						<p className="text-red-500 text-center text-xl">
							{errorCode === "codeDoesNotExist"
								? "El código ingresado no existe."
								: errorCode === "codeUsed"
								? "El código ingresado ya fue utilizado."
								: errorCode === "instagramDoesNotMatch"
								? "El usuario de Instagram ingresado no coincide con el que se registró con el código."
								: "Ha ocurrido un error inesperado."}
						</p>
					) : (
						<p className="text-green-500 text-center text-xl">
							Código canjeado con éxito.
						</p>
					)}
					<Button
						color="secondary"
						auto
						className="w-full mt-5"
						onPress={() => setSentPetition(false)}
					>
						Canjear otro código
					</Button>
				</div>
			) : (
				<>
					<h1 className="text-2xl font-semibold mb-5 text-center">
						Canjear código
					</h1>
					<Input
						type="text"
						label="Código"
						placeholder="Ingresar código"
						className="w-full mb-5"
						value={code}
						onChange={(e) => setCode(e.target.value)}
					/>
					<Input
						type="text"
						label="Instagram"
						placeholder="Ingresar usuario de Instagram"
						className="w-full mb-5"
						value={instagram}
						onChange={(e) => setInstagram(e.target.value)}
					/>
					<Button
						color="secondary"
						auto
						className="w-full"
						isLoading={loading}
						onPress={handleClaimCode}
					>
						Canjear
					</Button>
				</>
			)}
		</div>
	);
}
