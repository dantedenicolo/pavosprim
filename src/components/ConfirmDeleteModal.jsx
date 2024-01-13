import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
} from "@nextui-org/react";
import { deleteSellProduct } from "../firebase/client";
import { useState } from "react";

export default function ConfirmDeleteModal({ isOpen, onOpenChange, product }) {
	const [loading, setLoading] = useState(false);
	const handleDelete = async () => {
		setLoading(true);
		await deleteSellProduct(product.id);
		setLoading(false);
		onOpenChange();
	};
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				className="dark"
				placement="center"
			>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Eliminar producto {product.name}
							</ModalHeader>
							<ModalBody>
								<p>
									¿Estás seguro de que quieres eliminar el producto{" "}
									{product.name}? Esta acción no se puede deshacer.
								</p>
							</ModalBody>
							<ModalFooter>
								<Button color="secondary">Cancelar</Button>
								<Button
									color="danger"
									isLoading={loading}
									onClick={handleDelete}
								>
									{loading ? "Eliminando..." : "Eliminar"}
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
