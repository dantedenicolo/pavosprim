import { Spinner } from "@nextui-org/react";
import { useEffect } from "react";

export default function Redirect({ url }) {
	useEffect(() => {
		setTimeout(() => {
			window.location.href = url;
		}, 500);
	}, [url]);

	return (
		<div className="flex flex-col items-center justify-center w-full h-[100svh]">
			<Spinner color="secondary" />
		</div>
	);
}
