export default function Footer() {
	return (
		<div className="absolute bottom-0 w-full flex flex-col items-center justify-center bg-gray-800 h-28 text-center">
			<p className="dark text-md font-semibold mb-1 max-md:text-sm max-md:w-3/4 max-sm:w-full">
				&copy; 2024 PavosPrim. Todos los derechos reservados.
			</p>
			<p className="dark text-md font-normal text-gray-300 mb-1 max-md:text-sm max-md:w-3/4 max-sm:w-[90%]">
				Este sitio web no esta patrocinado, respaldado ni administrado por Epic
				Games, Inc.
			</p>
			<p className="dark text-md font-normal max-md:text-sm max-md:w-3/4">
				Sitio web desarrollado por{" "}
				<a
					href="https://instagram.com/dantedenicolo"
					target="_blank"
					rel="noreferrer"
					className="text-purple-500"
				>
					Dante De Nicoló
				</a>
			</p>
		</div>
	);
}
