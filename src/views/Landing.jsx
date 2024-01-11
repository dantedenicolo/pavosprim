import { Image } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

function Number({ n }) {
	const { number } = useSpring({
		from: { number: 0 },
		number: n,
		delay: 200,
		config: { mass: 1, tension: 20, friction: 10 },
	});
	return (
		<div className="text-4xl font-bold flex flex-row max-md:text-3xl">
			+<animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
		</div>
	);
}

export default function Landing() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center dark md:w-[700px] overflow-hidden">
			<Image
				src="/logo.png"
				width={125}
				height={125}
				className="dark max-md:w-[100px]"
				disableSkeleton
			/>
			<h1 className="text-5xl font-bold mt-2 max-md:text-3xl">PavosPrim</h1>
			<p className="text-xl mt-2 font-semibold text-center max-md:text-lg">
				La tienda de pavos con mejores precios de todo LATAM.
			</p>
			<div className="mt-4 flex flex-row items-center justify-center w-full">
				<Link to="/tienda" className="self-center">
					<Button
						color="secondary"
						auto
						className="dark font-semibold text-md max-md:text-sm"
					>
						Ir a la tienda
					</Button>
				</Link>
			</div>
			<div className="mt-4 flex flex-row items-center justify-between w-full text-center">
				<div className="flex flex-col items-center justify-center w-1/3">
					<Number n={2} />
					<p className="dark text-md font-semibold text-center max-md:text-sm">
						Años vendiendo
					</p>
				</div>
				<div className="flex flex-col items-center justify-center w-1/3">
					<Number n={3000} />
					<p className="dark text-md font-semibold text-center max-md:text-sm">
						Ventas concretadas
					</p>
				</div>
				<div className="flex flex-col items-center justify-center w-1/3 text-center">
					<Number n={1200} />
					<p className="dark text-md font-semibold text-center max-md:text-sm">
						Clientes <span className="max-md:hidden">en todo el mundo</span>{" "}
						<span className="hidden max-md:inline">satisfechos</span>
					</p>
				</div>
			</div>
			{/* footer */}
			<div className="absolute bottom-0 w-full flex flex-col items-center justify-center bg-gray-800 h-28 text-center">
				<p className="dark text-md font-semibold mb-1 max-md:text-sm max-md:w-3/4">
					&copy; 2024 PavosPrim. Todos los derechos reservados.
				</p>
				<p className="dark text-md font-normal text-gray-300 mb-1 max-md:text-sm max-md:w-3/4">
					Este sitio web no esta patrocinado, respaldado ni administrado por
					Epic Games, Inc.
				</p>
				<p className="dark text-md font-normal max-md:text-sm max-md:w-3/4">
					Sitio web desarrollado por{" "}
					<a
						href="https://instagram.com/dantendenicolo"
						target="_blank"
						rel="noreferrer"
						className="text-purple-500"
					>
						Dante De Nicoló
					</a>
				</p>
			</div>
		</main>
	);
}
