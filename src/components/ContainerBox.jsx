export default function ContainerBox({ children }) {
	return (
		<main className="max-w-[1200px] min-h-[calc(100svh-40px)] max-md:max-w-full w-[calc(100%-40px)] my-5 flex flex-col items-center rounded-lg dark max-sm:w-full">
			{children}
		</main>
	);
}
