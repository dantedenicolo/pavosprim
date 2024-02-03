import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import {
	Button,
	Select,
	SelectItem,
	Spinner,
	Textarea,
} from "@nextui-org/react";
import { ContainerBox } from "../../components";
import {
	getPavosPrimStatus,
	updatePavosPrimStatus,
} from "../../firebase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Input } from "postcss";

export default function Status() {
	const user = useUser();
	const [isLoading, setIsLoading] = useState(true);
	const [status, setStatus] = useState(null);
	const [submitting, setSubmitting] = useState(false);
	const [success, setSuccess] = useState(false);
	const redirect = useNavigate();
	useEffect(() => {
		if (user === null) {
			redirect("/staff/login");
		} else if (user && user?.approvalStatus !== "approved") {
			redirect("/staff");
		} else if (user && user?.approvalStatus === "approved" && status !== null) {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, status]);

	useEffect(() => {
		if (user && user?.approvalStatus === "approved") {
			getPavosPrimStatus(setStatus);
		}
	}, [user]);

	const handleUpdateStatus = async () => {
		console.log(status);
		setSubmitting(true);
		await updatePavosPrimStatus(status);
		setSubmitting(false);
		setSuccess(true);
	};

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				setSuccess(false);
			}, 1500);
		}
	}, [success]);

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center w-full h-[100svh]">
					<Spinner color="secondary" />
				</div>
			) : (
				<ContainerBox>
					<p className="text-white my-5 text-xl font-bold">Cargas:</p>
					{status &&
						status
							.filter((s) => s.type === "cargas")
							.map((s) => (
								<>
									<div
										key={s.id}
										className="flex flex-row justify-between w-[300px] md:w-[400px] items-center mt-1"
									>
										<p className="text-white mt-1 font-semibold">{s.name}</p>
										<select
											className={
												"w-1/2 rounded-md bg-gray-800 text-black p-2 " +
												(s.status === "down"
													? "bg-red-500"
													: s.status === "delayed"
													? "bg-yellow-500"
													: "bg-green-500")
											}
											onChange={(e) =>
												setStatus(
													status.map((st) =>
														st.id === s.id
															? { ...st, status: e.target.value }
															: st
													)
												)
											}
											value={s.status}
										>
											<option
												className="bg-green-500 text-black"
												value="operational"
											>
												Realizando cargas
											</option>
											<option
												className="bg-yellow-500 text-black"
												value="delayed"
											>
												Cargas demoradas
											</option>
											<option className="bg-red-500 text-black" value="down">
												Cerrado temporalmente
											</option>
										</select>
									</div>
									<hr className="w-[300px] md:w-[400px] mt-1" />
								</>
							))}
					<p className="text-white my-5 font-bold text-xl">Pagos:</p>
					{status &&
						status
							.filter((s) => s.type === "pagos")
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((s) => (
								<>
									<div
										key={s.id}
										className="flex flex-row justify-between w-[300px] md:w-[400px] items-center mt-1"
									>
										<p className="text-white mt-1 font-semibold">{s.name}</p>
										<select
											className={
												"w-1/2 rounded-md bg-gray-800 text-black p-2 " +
												(s.status === "down"
													? "bg-red-500"
													: s.status === "delayed"
													? "bg-yellow-500"
													: "bg-green-500")
											}
											onChange={(e) =>
												setStatus(
													status.map((status) =>
														status.id === s.id
															? { ...status, status: e.target.value }
															: status
													)
												)
											}
											value={s.status}
										>
											<option
												className="bg-green-500 text-black"
												value="operational"
											>
												Operativo
											</option>
											<option
												className="bg-yellow-500 text-black"
												value="delayed"
											>
												Demoras
											</option>
											<option className="bg-red-500 text-black" value="down">
												Caido
											</option>
										</select>
									</div>
									<hr className="w-[300px] md:w-[400px] mt-1" />
								</>
							))}
					{status && status.filter((s) => s.type === "message")[0] && (
						<Textarea
							className="mt-5 dark text-white w-[300px] md:w-[400px]"
							placeholder="Ingrese observaciones..."
							value={status.filter((s) => s.type === "message")[0].status}
							onChange={(e) =>
								setStatus(
									status.map((s) =>
										s.type === "message" ? { ...s, status: e.target.value } : s
									)
								)
							}
						></Textarea>
					)}
					<Button
						className="mt-5 w-[300px] md:w-[400px]"
						onClick={handleUpdateStatus}
						color="secondary"
						isLoading={submitting}
						disabled={submitting || success}
					>
						{success ? "Actualizado" : "Actualizar"}
					</Button>
				</ContainerBox>
			)}
		</>
	);
}
