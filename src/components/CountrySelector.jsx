export default function CountrySelector({ setSelectedCountry }) {
	return (
		<>
			<h1 className="text-4xl text-center font-bold max-md:text-2xl">
				Selecciona tu país:
			</h1>
			<div className="flex flex-row items-center justify-center gap-2 mt-5 flex-wrap max-md:w-[400px]">
				<button
					className="flex flex-col items-center justify-center w-40 h-40 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
					onClick={() => setSelectedCountry("Argentina")}
				>
					<img
						src="/rounded-argentina.png"
						alt="Argentina"
						className="w-20 h-20"
					/>
					<h1 className="text-xl font-bold text-white">Argentina</h1>
				</button>
				<button
					className="flex flex-col items-center justify-center w-40 h-40 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
					onClick={() => setSelectedCountry("Mexico")}
				>
					<img
						src="/rounded-mexico.png"
						alt="México"
						className="w-20 h-20 scale-110"
					/>
					<h1 className="text-xl font-bold text-white">México</h1>
				</button>
				<button
					className="flex flex-col items-center justify-center w-40 h-40 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
					onClick={() => setSelectedCountry("Colombia")}
				>
					<img
						src="/rounded-colombia.png"
						alt="Colombia"
						className="w-20 h-20"
					/>
					<h1 className="text-xl font-bold text-white">Colombia</h1>
				</button>
				<button
					className="flex flex-col items-center justify-center w-40 h-40 bg-purple-600 hover:bg-purple-700 rounded-lg shadow-md"
					onClick={() => setSelectedCountry("Otro")}
				>
					<img src="/rounded-world.png" alt="Other" className="w-20 h-20" />
					<h1 className="text-xl font-bold text-white">Otro</h1>
				</button>
			</div>
		</>
	);
}
