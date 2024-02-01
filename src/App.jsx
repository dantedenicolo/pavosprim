import { Routes, Route } from "react-router-dom";
import {
	Landing,
	Store,
	Precios,
	Staff,
	Login,
	// Work,
	Products,
	NotFound,
} from "./views";
import "animate.css";

// import { useDisclosure } from "@nextui-org/react";
// import { WelcomeModal } from "./components";
// import { useEffect } from "react";

function App() {
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
	// const dismissed = localStorage.getItem("dismissed");

	// useEffect(() => {
	// 	if (dismissed) return;
	// 	onOpen();
	// }, [onOpen, dismissed]);

	return (
		<main className="dark flex flex-col items-center overflow-hidden bg-gray-900">
			<Routes>
				<Route path="/" element={<Landing />} />
				<Route path="/tienda" element={<Store />} />
				<Route
					path="/tienda/pavos"
					element={<Store type="pavos" currencyURL="ARS" />}
				/>
				<Route
					path="/tienda/pavos/MXN"
					element={<Store type="pavos" currencyURL="MXN" />}
				/>
				<Route
					path="/tienda/pavos/ARS"
					element={<Store type="pavos" currencyURL="ARS" />}
				/>
				<Route
					path="/tienda/pavos/USD"
					element={<Store type="pavos" currencyURL="USD" />}
				/>
				<Route
					path="/tienda/pavos/GLOBAL"
					element={<Store type="pavos" currencyURL="GLOBAL" />}
				/>
				<Route
					path="/tienda/fortnite"
					element={<Store type="fortnite" currencyURL="ARS" />}
				/>
				<Route
					path="/tienda/fortnite/MXN"
					element={<Store type="fortnite" currencyURL="MXN" />}
				/>
				<Route
					path="/tienda/fortnite/ARS"
					element={<Store type="fortnite" currencyURL="ARS" />}
				/>
				<Route path="/precios" element={<Precios />} />
				<Route path="/staff" element={<Staff />} />
				<Route path="/staff/login" element={<Login />} />
				{/* <Route path="/staff/work" element={<Work />} /> */}
				<Route path="/staff/products" element={<Products />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			{/* <WelcomeModal isOpen={isOpen} onOpenChange={onOpenChange} /> */}
		</main>
	);
}

export default App;
