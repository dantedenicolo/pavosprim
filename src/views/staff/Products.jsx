import React, { useEffect } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Input,
	Button,
	DropdownTrigger,
	Dropdown,
	DropdownMenu,
	DropdownItem,
	Chip,
	Pagination,
} from "@nextui-org/react";
import {
	PlusIcon,
	ChevronDownIcon,
	SearchIcon,
	VerticalDotsIcon,
} from "../../icons";
import { capitalize } from "../../utils/utils";
import { ContainerBox, CreateSellProductModal } from "../../components";
import {
	getAllSellProducts,
	getAllProducts,
	deleteSellProduct,
} from "../../firebase/client";
import { useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const currencyColorMap = {
	ARS: "primary",
	MXN: "success",
	USD: "danger",
};

const currencyOptions = [
	{ name: "ARS", uid: "ARS" },
	{ name: "MXN", uid: "MXN" },
	{ name: "USD", uid: "USD" },
];

const columns = [
	{ name: "ID", uid: "id" },
	{ name: "NOMBRE", uid: "name" },
	{ name: "MONEDA", uid: "currency" },
	{ name: "PRECIO", uid: "price" },
	{ name: "PROVEEDOR", uid: "storeType", sortable: true },
	{ name: "ACCIONES", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
	"name",
	"role",
	"currency",
	"price",
	"storeType",
	"actions",
];

export default function Products() {
	const redirect = useNavigate();
	const user = useUser();
	const [isLoading, setIsLoading] = React.useState(true);
	const [sellProducts, setSellProducts] = React.useState(["loading"]);
	// eslint-disable-next-line no-unused-vars
	const [products, setProducts] = React.useState([]);
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	useEffect(() => {
		let unsubscribe;
		(async () => {
			unsubscribe =
				(await getAllSellProducts(setSellProducts)) &&
				(await getAllProducts(setProducts));
		})();
		return () => unsubscribe && unsubscribe();
	}, []);

	useEffect(() => {
		if (user === null) {
			redirect("/login");
		} else if (user && user?.approvalStatus !== "approved") {
			redirect("/staff");
		} else if (
			user &&
			user?.approvalStatus === "approved" &&
			sellProducts[0] !== "loading"
		) {
			setIsLoading(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, sellProducts]);

	const [filterValue, setFilterValue] = React.useState("");
	const [visibleColumns, setVisibleColumns] = React.useState(
		new Set(INITIAL_VISIBLE_COLUMNS)
	);
	const [currencyFilter, setCurrencyFilter] = React.useState("all");
	const [rowsPerPage, setRowsPerPage] = React.useState(15);
	const [sortDescriptor, setSortDescriptor] = React.useState({
		column: "price",
		direction: "ascending",
	});
	const [page, setPage] = React.useState(1);

	const hasSearchFilter = Boolean(filterValue);

	const headerColumns = React.useMemo(() => {
		if (visibleColumns === "all") return columns;

		return columns.filter((column) =>
			Array.from(visibleColumns).includes(column.uid)
		);
	}, [visibleColumns]);

	const filteredItems = React.useMemo(() => {
		let filteredSellProducts = [...sellProducts];

		if (hasSearchFilter) {
			filteredSellProducts = filteredSellProducts.filter((product) =>
				product.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}
		if (
			currencyFilter !== "all" &&
			Array.from(currencyFilter).length !== currencyOptions.length
		) {
			filteredSellProducts = filteredSellProducts.filter((product) =>
				Array.from(currencyFilter).includes(product.currency)
			);
		}

		return filteredSellProducts;
	}, [sellProducts, filterValue, currencyFilter, hasSearchFilter]);

	const pages = Math.ceil(filteredItems.length / rowsPerPage);

	const items = React.useMemo(() => {
		const start = (page - 1) * rowsPerPage;
		const end = start + rowsPerPage;

		return filteredItems.slice(start, end);
	}, [page, filteredItems, rowsPerPage]);

	const sortedItems = React.useMemo(() => {
		return [...items].sort((a, b) => {
			// sort by name
			const nameA = a.storeType?.toLowerCase();
			const nameB = b.storeType?.toLowerCase();

			if (nameA < nameB)
				return sortDescriptor.direction === "ascending" ? -1 : 1;
			if (nameA > nameB)
				return sortDescriptor.direction === "ascending" ? 1 : -1;
			return 0;
		});
	}, [sortDescriptor, items]);

	const renderCell = React.useCallback((product, columnKey) => {
		const cellValue = product[columnKey];

		switch (columnKey) {
			case "name":
				return product.name;
			case "currency":
				return (
					<Chip
						color={currencyColorMap[cellValue]}
						className="capitalize"
						size="mini"
					>
						{cellValue}
					</Chip>
				);
			case "price":
				return "$" + cellValue;
			case "storeType":
				return cellValue;
			case "actions":
				return (
					<div className="relative flex justify-end items-center gap-2">
						<Dropdown className="dark">
							<DropdownTrigger>
								<Button isIconOnly size="sm" variant="dark">
									<VerticalDotsIcon className="text-default-300" />
								</Button>
							</DropdownTrigger>
							<DropdownMenu className="dark">
								<DropdownItem
									onClick={() => {
										deleteSellProduct(product.id);
									}}
								>
									Eliminar
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				);
			default:
				return cellValue;
		}
	}, []);

	const onNextPage = React.useCallback(() => {
		if (page < pages) {
			setPage(page + 1);
		}
	}, [page, pages]);

	const onPreviousPage = React.useCallback(() => {
		if (page > 1) {
			setPage(page - 1);
		}
	}, [page]);

	const onRowsPerPageChange = React.useCallback((e) => {
		setRowsPerPage(Number(e.target.value));
		setPage(1);
	}, []);

	const onSearchChange = React.useCallback((value) => {
		if (value) {
			setFilterValue(value);
			setPage(1);
		} else {
			setFilterValue("");
		}
	}, []);

	const onClear = React.useCallback(() => {
		setFilterValue("");
		setPage(1);
	}, []);

	const topContent = React.useMemo(() => {
		return (
			<div className="flex flex-col gap-4">
				<div className="flex justify-between gap-3 items-end">
					<Input
						isClearable
						className="w-full sm:max-w-[44%] dark"
						placeholder="Buscar producto"
						size="small"
						startContent={<SearchIcon />}
						value={filterValue}
						onClear={() => onClear()}
						onValueChange={onSearchChange}
					/>
					<div className="flex gap-3">
						<Dropdown className="dark">
							<DropdownTrigger className="hidden sm:flex dark">
								<Button
									className="dark"
									endContent={<ChevronDownIcon className="text-small" />}
									variant="flat"
								>
									Moneda
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								className="dark"
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={currencyFilter}
								selectionMode="multiple"
								onSelectionChange={setCurrencyFilter}
							>
								{currencyOptions.map((currency) => (
									<DropdownItem key={currency.uid} className="capitalize">
										{capitalize(currency.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Dropdown className="dark">
							<DropdownTrigger className="hidden sm:flex dark">
								<Button
									endContent={<ChevronDownIcon className="text-small" />}
									variant="flat"
									className="dark"
								>
									Columnas
								</Button>
							</DropdownTrigger>
							<DropdownMenu
								className="dark"
								disallowEmptySelection
								aria-label="Table Columns"
								closeOnSelect={false}
								selectedKeys={visibleColumns}
								selectionMode="multiple"
								onSelectionChange={
									// If there is just one column left, we don't allow to hide it
									(selected) =>
										selected.size === 1 ? null : setVisibleColumns(selected)
								}
							>
								{columns.map((column) => (
									<DropdownItem key={column.uid} className="capitalize">
										{capitalize(column.name)}
									</DropdownItem>
								))}
							</DropdownMenu>
						</Dropdown>
						<Button
							color="secondary"
							endContent={<PlusIcon />}
							onPress={onOpen}
						>
							Crear producto
						</Button>
					</div>
				</div>
				<div className="flex justify-between items-center">
					<span className="text-default-400 text-small">
						Total: {sellProducts.length} productos
					</span>
				</div>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		filterValue,
		currencyFilter,
		visibleColumns,
		onRowsPerPageChange,
		sellProducts.length,
		onSearchChange,
		hasSearchFilter,
	]);

	const bottomContent = React.useMemo(() => {
		return (
			<div className="py-2 px-2 flex justify-between items-center">
				<Pagination
					isCompact
					showControls
					showShadow
					color="secondary"
					page={page}
					total={pages}
					onChange={setPage}
				/>
				<div className="hidden sm:flex w-[30%] justify-end gap-2">
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onPreviousPage}
					>
						Anterior
					</Button>
					<Button
						isDisabled={pages === 1}
						size="sm"
						variant="flat"
						onPress={onNextPage}
					>
						Siguiente
					</Button>
				</div>
			</div>
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [items.length, page, pages, hasSearchFilter]);

	return (
		<>
			{isLoading ? (
				<div className="flex flex-col items-center justify-center w-full h-[100svh]">
					<Spinner color="secondary" />
				</div>
			) : (
				<ContainerBox>
					<Table
						aria-label="Example table with custom cells, pagination and sorting"
						className="dark p-5 max-sm:p-2 max-sm:mt-2"
						isHeaderSticky
						bottomContent={bottomContent}
						bottomContentPlacement="outside"
						classNames={{
							wrapper: "max-h-[650px] max-sm:max-h-[400px]",
						}}
						sortDescriptor={sortDescriptor}
						topContent={topContent}
						topContentPlacement="outside"
						onSortChange={setSortDescriptor}
					>
						<TableHeader columns={headerColumns} className="dark">
							{(column) => (
								<TableColumn
									key={column.uid}
									align={column.uid === "actions" ? "center" : "start"}
									allowsSorting={column.sortable}
									className="dark"
								>
									{column.name}
								</TableColumn>
							)}
						</TableHeader>
						<TableBody
							emptyContent={"No se encontraron productos"}
							items={sortedItems}
							className="dark"
						>
							{(item) => (
								<TableRow key={item.id} className="dark">
									{(columnKey) => (
										<TableCell className="dark">
											{renderCell(item, columnKey)}
										</TableCell>
									)}
								</TableRow>
							)}
						</TableBody>
					</Table>
					<CreateSellProductModal isOpen={isOpen} onOpenChange={onOpenChange} />
					<Link to="/staff">
						<Button color="secondary">Volver</Button>
					</Link>
				</ContainerBox>
			)}
		</>
	);
}
