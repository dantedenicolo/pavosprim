import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";

export default function UserStatusAlert({ type, user }) {
	return (
		<>
			{type === "pending" ? (
				<div className="flex flex-col border border-yellow-500 rounded-lg p-10 w-[500px] max-md:w-[400px] max-md:p-5">
					<FontAwesomeIcon
						icon={faWarning}
						size="2x"
						className="text-yellow-500"
					/>
					<p className="text-xl mt-2 font-semibold text-center max-md:text-lg">
						¡Hola, {user.username}! <br />
						<span className="font-normal text-lg max-md:text-base">
							Tu cuenta está pendiente de aprobación. Una vez aprobada, podrás
							acceder a la sección del staff.
						</span>
					</p>
				</div>
			) : type === "rejected" ? (
				<div className="flex flex-col border border-red-500 rounded-lg p-10 w-[500px] max-md:w-[400px] max-md:p-5">
					<FontAwesomeIcon
						icon={faXmarkCircle}
						size="2x"
						className="text-red-500"
					/>
					<p className="text-xl mt-2 font-semibold text-center max-md:text-lg">
						¡Hola, {user.username}! <br />
						<span className="font-normal text-lg max-md:text-base">
							Tu cuenta ha sido rechazada. Si crees que esto es un error, por
							favor contacta con el staff.
						</span>
					</p>
				</div>
			) : null}
		</>
	);
}
