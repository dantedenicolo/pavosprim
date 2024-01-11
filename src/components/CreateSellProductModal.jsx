import { useEffect, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Image,
} from "@nextui-org/react";
import { Select } from "@nextui-org/react";
import { SelectItem } from "@nextui-org/react";
import {
	createProduct,
	getAllStoreTypes,
	uploadImage,
} from "../firebase/client";
import { createSellProduct } from "../firebase/client";
import { getAllProducts } from "../firebase/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function CreateSellProductModal({ isOpen, onOpenChange }) {
	const [storeTypes, setStoreTypes] = useState([]);
	const [selectedStoreType, setSelectedStoreType] = useState(null);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [discount, setDiscount] = useState(null);
	const [products, setProducts] = useState([]);
	const [selectedProductID, setSelectedProductID] = useState(null);
	const [price, setPrice] = useState(null);
	const [creationType, setCreationType] = useState("sellProduct");
	const [productName, setProductName] = useState(null);
	const [regularPrice, setRegularPrice] = useState(null);
	const [beloPrice, setBeloPrice] = useState(null);
	const [errorImage, setErrorImage] = useState("");
	const [imageURL, setImageURL] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let unsubscribe;
		(async () => {
			unsubscribe = await getAllStoreTypes(setStoreTypes);
		})();
		return () => unsubscribe && unsubscribe();
	}, []);

	useEffect(() => {
		let unsubscribe;
		(async () => {
			unsubscribe = await getAllProducts(setProducts);
		})();
		return () => unsubscribe && unsubscribe();
	}, []);

	const handleCreateSellProduct = async () => {
		if (!selectedProductID || !price || !selectedStoreType) {
			return;
		}
		if (
			products.find((product) => product.id === selectedProductID).category ===
				"combos" &&
			!discount
		) {
			return;
		}
		setLoading(true);
		await createSellProduct({
			productID: selectedProductID,
			name: products.find((product) => product.id === selectedProductID).name,
			category: products.find((product) => product.id === selectedProductID)
				.category,
			discount: discount ? Number(discount.replace("%", "").trim()) : null,
			price: Number(price),
			storeType: selectedStoreType,
			currency: storeTypes.find(
				(storeType) => storeType.name === selectedStoreType
			)?.currency,
		});
		setLoading(false);
		setPrice(null);
		setSelectedStoreType(null);
		setSelectedProductID(null);
		setCreationType("sellProduct");
		setProductName(null);
		setRegularPrice(null);
		setBeloPrice(null);
		onOpenChange();
	};

	const handleUploadImage = async (e) => {
		const file = e.target.files[0];

		if (!file) {
			return;
		}
		if (
			!file.type.includes("image/png") &&
			!file.type.includes("image/jpeg") &&
			!file.type.includes("image/jpg")
		) {
			setErrorImage("Imagen no válida");

			return;
		}
		// check if file is larger than 5mb
		if (file.size > 5000000) {
			setErrorImage("Imagen demasiado grande");

			return;
		}
		try {
			const task = uploadImage(file);
			task.on(
				"state_changed",
				(snapshot) => {
					const percentage =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				},
				(error) => {
					// if there is an error, console.log it
					console.log(error);
				},
				() => {
					// when the image is uploaded, get the url and set it to imageURL and input.image
					task.snapshot.ref.getDownloadURL().then((url) => {
						setImageURL(url);
						setErrorImage("");
					});
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	const handleCreateProduct = async () => {
		if (
			!productName ||
			!regularPrice ||
			!beloPrice ||
			!imageURL ||
			!selectedCategory
		) {
			return;
		}
		setLoading(true);
		await createProduct({
			name: productName,
			category: selectedCategory,
			regularPrice: Number(regularPrice),
			beloPrice: Number(beloPrice),
			image: imageURL,
		});
		setLoading(false);
		setImageURL(null);
		setProductName(null);
		setRegularPrice(null);
		setBeloPrice(null);
		setCreationType("sellProduct");
		setPrice(null);
		setSelectedStoreType(null);
		setSelectedProductID(null);
		onOpenChange();
	};

	const handleClose = () => {
		setCreationType("sellProduct");
		setPrice(null);
		setSelectedStoreType(null);
		setSelectedProductID(null);
		setImageURL(null);
		setProductName(null);
		setRegularPrice(null);
		setBeloPrice(null);
		onOpenChange();
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="center"
				className="dark"
			>
				<ModalContent>
					{(onClose) => (
						<>
							{creationType === "sellProduct" ? (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Crear producto de venta
									</ModalHeader>
									<ModalBody className="dark">
										<Select
											label="Producto"
											placeholder="Seleccionar producto"
											variant="bordered"
											onChange={(e) => setSelectedProductID(e.target.value)}
										>
											<SelectItem
												value="product"
												onClick={() => setCreationType("create")}
												className="text-black"
											>
												<FontAwesomeIcon
													icon={faPlus}
													className="mr-2 text-black"
												/>
												Crear nuevo producto
											</SelectItem>
											{products.map((product) => (
												<SelectItem key={product.id} className="text-black">
													{product.name}
												</SelectItem>
											))}
										</Select>

										<Select
											label="Proveedor"
											className="dark"
											placeholder="Seleccionar proveedor"
											variant="bordered"
											onChange={(e) => setSelectedStoreType(e.target.value)}
										>
											{storeTypes.map((storeType) => (
												<SelectItem key={storeType.name} className="text-black">
													{storeType.name}
												</SelectItem>
											))}
										</Select>
										<Input
											label="Precio"
											placeholder={
												selectedStoreType
													? "Precio del producto en " +
													  storeTypes.find(
															(storeType) =>
																storeType.name === selectedStoreType
													  )?.currency
													: "Selecciona un proveedor"
											}
											variant="bordered"
											onChange={(e) => setPrice(e.target.value)}
										/>
										{selectedProductID &&
											products.find(
												(product) => product.id === selectedProductID
											).category === "combos" && (
												<Input
													label="Descuento"
													placeholder="Descuento del combo (en %)"
													variant="bordered"
													onChange={(e) => setDiscount(e.target.value)}
												/>
											)}
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="flat" onPress={handleClose}>
											Cancelar
										</Button>
										<Button
											color="secondary"
											onPress={handleCreateSellProduct}
											isLoading={loading}
										>
											{loading ? "Creando..." : "Crear"}
										</Button>
									</ModalFooter>
								</>
							) : (
								<>
									<ModalHeader className="flex flex-col gap-1">
										Crear producto
									</ModalHeader>
									<ModalBody>
										<input
											type="file"
											id="image"
											accept="image/png, image/jpeg, image/jpg"
											className="hidden"
											onChange={handleUploadImage}
										/>
										{imageURL && (
											<div className="flex justify-center">
												<Image
													src={imageURL}
													width={208}
													height={277}
													alt="product image"
													className=" w-[208px] h-[277px] object-cover"
												/>
											</div>
										)}
										<Button color="secondary">
											<label
												htmlFor="image"
												className="w-full cursor-pointer h-full flex justify-center items-center"
											>
												{imageURL ? "Cambiar imagen" : "Subir imagen"}
											</label>
										</Button>

										<Input
											label="Nombre"
											placeholder="Nombre del producto"
											variant="bordered"
											onChange={(e) => setProductName(e.target.value)}
										/>
										<Select
											label="Categoria"
											placeholder="Seleccionar categoria"
											variant="bordered"
											onChange={(e) => setSelectedCategory(e.target.value)}
										>
											<SelectItem
												value="pavos"
												key="pavos"
												className="text-black"
											>
												Pavos
											</SelectItem>
											<SelectItem
												value="packs"
												key="packs"
												className="text-black"
											>
												Packs
											</SelectItem>
											<SelectItem
												value="combos"
												key="combos"
												className="text-black"
											>
												Combos
											</SelectItem>
										</Select>

										<Input
											label="Precio regular"
											placeholder="Precio regular del producto"
											variant="bordered"
											onChange={(e) => setRegularPrice(e.target.value)}
										/>
										<Input
											label="Precio Belo"
											placeholder="Precio Belo del producto"
											variant="bordered"
											onChange={(e) => setBeloPrice(e.target.value)}
										/>
									</ModalBody>
									<ModalFooter>
										<Button color="danger" variant="flat" onPress={handleClose}>
											Cancelar
										</Button>
										<Button
											color="secondary"
											onPress={handleCreateProduct}
											isLoading={loading}
										>
											{loading ? "Creando..." : "Crear"}
										</Button>
									</ModalFooter>
								</>
							)}
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
