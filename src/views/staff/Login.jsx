"use client";
import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { loginWithGoogle } from "../../firebase/client";
import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@nextui-org/react";

export default function Login() {
	useEffect(() => {
		document.title = "Iniciar sesión - PavosPrim Staff";
	}, []);

	const redirect = useNavigate();
	const user = useUser();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (user) {
			redirect("/staff");
		} else if (user === null) {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);
	return (
		<main className="flex flex-col items-center justify-center dark h-[100svh]">
			{isLoading ? (
				<Spinner color="secondary" />
			) : (
				<>
					<Image
						src="/logo.png"
						width={100}
						height={100}
						className="dark"
						disableSkeleton
					/>
					<h1 className="text-4xl font-bold mt-2">PavosPrim Staff</h1>
					<p className="text-xl mt-2 font-semibold text-center max-md:text-sm">
						Inicia sesión para acceder a la sección del staff.
					</p>
					<div className="mt-4">
						<Button
							color="secondary"
							auto
							className="dark font-semibold text-md"
							onClick={loginWithGoogle}
						>
							Iniciar sesión
						</Button>
					</div>
				</>
			)}
		</main>
	);
}
