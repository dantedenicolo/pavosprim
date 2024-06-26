import { Button } from "@nextui-org/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
	useEffect(() => {
		document.title = "404 - PavosPrim";
	}, []);
	return (
		<div className="flex flex-col items-center justify-center w-full h-[100svh]">
			<h1 className="text-6xl font-bold text-white">404</h1>
			<p className="text-white mt-5">
				PavosPrim no pudo localizar esta página.
			</p>
			<Link to="/">
				<Button color="secondary" auto className="mt-5">
					Volver al inicio
				</Button>
			</Link>
		</div>
	);
}
