import useUser from "../../hooks/useUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "@nextui-org/react";

import axios from "axios";
import {
	ClaimCode,
	ContainerBox,
	// DataBoxPanel,
	// ListaVentas,
	NavBarPanel,
	UserStatusAlert,
} from "../../components";
import { logout } from "../../firebase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

export default function Staff() {
	const redirect = useNavigate();
	const user = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const [MXNARS, setMXNARS] = useState(null);
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
		if (user === null) {
			redirect("/staff/login");
		} else if (user && MXNARS && MXNUSD && USDARS) {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, MXNARS, MXNUSD, USDARS]);

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center w-full h-[100svh]">
					<Spinner color="secondary" />
				</div>
			) : (
				<>
					{user?.approvalStatus !== "approved" ? (
						<div className="flex flex-col items-center justify-center w-full h-[100svh]">
							<UserStatusAlert type={user?.approvalStatus} user={user} />
						</div>
					) : (
						<ContainerBox>
							<NavBarPanel user={user} MXNARS={MXNARS} USDARS={USDARS} />
							{/* <div className="flex flex-row items-center justify-center gap-2 w-full p-3 h-1/3 max-md:flex-col">
								<DataBoxPanel type="ventas" qty="104" />
								<DataBoxPanel type="ganancias" qty="10250368.00" />
							</div>
							<p className="text-2xl font-semibold text-center max-md:text-lg mt-5 max-md:mt-2">
								Historial de ventas:
							</p>
							<ListaVentas /> */}
							<div className="flex flex-col items-center justify-center w-full h-[70svh]">
								<ClaimCode />
							</div>
							{/*  botom logout button */}
							<div className="flex flex-row items-center justify-center w-full p-3 gap-2">
								<Button
									color="danger"
									auto
									className="dark font-semibold text-sm"
									onClick={logout}
								>
									<FontAwesomeIcon icon={faSignOutAlt} className="text-white" />
									Cerrar sesión
								</Button>
							</div>
						</ContainerBox>
					)}
				</>
			)}
		</>
	);
}
