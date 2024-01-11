export default function DataBoxPanel({ type, qty }) {
	return (
		<div className="flex flex-col items-center justify-center border border-gray-600 rounded-lg w-full h-full ">
			<p className="text-xl font-semibold text-center max-md:text-lg text-purple-500">
				<span className="font-bold text-6xl max-md:text-4xl text-white">
					{type === "ventas" ? qty : `$${qty} ARS`}
				</span>{" "}
				<br />
				{type === "ventas" ? "ventas realizadas" : "ganancias generadas"}
			</p>
		</div>
	);
}
