export default function ContainerBox({ children }) {
	return (
		<main className="max-w-[1200px] max-md:max-w-full w-[calc(100%-40px)] h-[calc(100svh-40px)] my-5 flex flex-col items-center rounded-lg dark max-sm:w-full max-sm:-mt-28">
			{children}
		</main>
	);
}
