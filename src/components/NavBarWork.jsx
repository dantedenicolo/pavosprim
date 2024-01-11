import { User } from "@nextui-org/react";
import {
	faArrowRightFromBracket,
	faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavBarWork({ user, MXNARS, USDARS }) {
	return (
		<div className="flex flex-row-reverse items-center w-full p-5">
			<User
				name={
					<p className="font-semibold text-base text-white">{user?.username}</p>
				}
				description={
					<div className="flex flex-row items-center gap-1">
						<FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
						<p className="text-white">Trabajando</p>
					</div>
				}
				avatarProps={{
					src: user?.avatar,
				}}
				className="w-1/3 flex justify-end max-md:w-2/5"
			/>
			<div className="flex flex-row items-center justify-center w-1/3 gap-5 max-md:hidden">
				<div className="flex flex-row gap-2">
					<img src="/mexico.png" className="w-7 h-7 max-md:h-5 max-md:w-5" />
					<div className="flex flex-col items-center justify-center">
						<p>
							<span className="font-normal text-xs">
								<span className="font-semibold">ARS:</span> ${MXNARS}
							</span>
						</p>
					</div>
				</div>
				<div className="flex flex-row gap-2">
					<img src="/usa.png" className="w-7 h-7 max-md:h-5 max-md:w-5" />
					<div className="flex flex-col items-center justify-center">
						<p>
							<span className="font-normal text-xs">
								<span className="font-semibold">ARS:</span> ${USDARS}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div className="flex flex-row items-center gap-1 w-1/3 max-md:w-3/5">
				<Button
					color="danger"
					auto
					className="dark font-semibold max-md:text-xs"
				>
					<FontAwesomeIcon
						icon={faArrowRightFromBracket}
						className="text-white"
					/>
					Cerrar día
				</Button>
			</div>
		</div>
	);
}
