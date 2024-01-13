import { ContainerBox, NavBarWork } from "../../components";
import {
	findStoreSellsStarted,
	startStoreSells,
	findNamesByUIDS,
	joinStoreSells,
	getSellerSellsByDate,
} from "../../firebase/client";
import useUser from "../../hooks/useUser";
import { Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Work() {
	const redirect = useNavigate();
	// eslint-disable-next-line no-unused-vars
	const [currentDate, setCurrentDate] = useState(new Date());
	const [storeSells, setStoreSells] = useState(["loading"]);
	const [sellers, setSellers] = useState(["loading"]);
	const [sells, setSells] = useState(["loading"]);
	const [isLoading, setIsLoading] = useState(true);
	const user = useUser();

	const [MXNARS, setMXNARS] = useState(null);
	// eslint-disable-next-line no-unused-vars
	const [MXNUSD, setMXNUSD] = useState(null);
	const [USDARS, setUSDARS] = useState(null);

	useEffect(() => {
		const getCurrencies = axios
			.get("https://api.pavosprim.com/currencies")
			.then((res) => {
				setMXNARS(Number(res.data.MXNARS).toFixed(2));
				setMXNUSD(Number(res.data.MXNUSD).toFixed(2));
				setUSDARS(Number(res.data.USDARS).toFixed(2) - 8);
			});
		getCurrencies;
		setInterval(() => {
			getCurrencies;
		}, 30000);
	}, []);

	useEffect(() => {
		let unsubscribe;
		unsubscribe = findStoreSellsStarted(setStoreSells);
		return () => unsubscribe && unsubscribe();
	}, []);

	useEffect(() => {
		let unsubscribe;
		if (storeSells[0] !== "loading" && storeSells[0]) {
			unsubscribe = findNamesByUIDS(storeSells[0]?.sellersUIDS, (data) => {
				setSellers(data);
			});
		}
		return () => unsubscribe && unsubscribe();
	}, [storeSells]);

	useEffect(() => {
		let unsubscribe;
		if (storeSells[0] !== "loading" && storeSells[0]) {
			unsubscribe = getSellerSellsByDate(
				storeSells[0]?.date,
				user.uid,
				setSells
			);
		}
		return () => unsubscribe && unsubscribe();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [storeSells]);

	useEffect(() => {
		console.log(sells);
	}, [sells]);

	useEffect(() => {
		if (user === null) {
			redirect("/login");
		} else if (user && user.approvalStatus !== "approved") {
			redirect("/staff");
		} else if (
			user &&
			user.approvalStatus === "approved" &&
			storeSells[0] !== "loading"
		) {
			if (storeSells.length === 0) {
				setIsLoading(false);
			} else if (storeSells[0] && sellers[0] !== "loading") {
				setIsLoading(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, storeSells, sellers]);

	const handleStartSells = async () => {
		await startStoreSells(
			{
				date: currentDate.toLocaleDateString(),
				sells: [],
				sellersUIDS: [user.uid],
				status: "started",
			},
			user.uid
		);
	};

	const handleStartSelling = async () => {
		await joinStoreSells(storeSells[0].id, user.uid);
	};

	return (
		<>
			{isLoading ? (
				<Spinner color="secondary" />
			) : (
				<ContainerBox>
					{!sellers.find((seller) => seller.uid === user.uid) ? (
						<>
							<div className="flex flex-col items-center justify-center w-full h-full">
								<h1 className="text-2xl font-bold">
									Fecha: {currentDate.toLocaleDateString()}
								</h1>
								{storeSells.length === 0 ? (
									<>
										<p className="text-xl font-bold">
											Aún no se han iniciado las ventas
										</p>
										<Button
											className="mt-4"
											color="secondary"
											auto
											onClick={handleStartSells}
										>
											Iniciar ventas
										</Button>
									</>
								) : (
									<>
										Personas trabajando hoy:
										{sellers.map((seller) => (
											<p key={seller.uid}>{seller.username}</p>
										))}
										<Button
											className="mt-4"
											color="secondary"
											auto
											onClick={handleStartSelling}
										>
											Unirse
										</Button>
									</>
								)}
							</div>
						</>
					) : (
						<>
							<NavBarWork user={user} MXNARS={MXNARS} USDARS={USDARS} />
							<p className="text-xl font-bold">Ya estás trabajando hoy</p>
							<p className="text-xl font-bold">Fecha: {storeSells[0]?.date}</p>
						</>
					)}
				</ContainerBox>
			)}
		</>
	);
}
