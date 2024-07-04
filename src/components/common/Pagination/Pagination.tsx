"use client";
import { Pagination as MuiPagination, Box } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handlePageChange = (_: any, newPage: number) => {
		// Añadir al query params la page
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", `${newPage}`);
		const newSearchParams = params.toString();

		// Actualizar la URL con la nueva página
		router.push(pathname + "?" + newSearchParams);
	};

	return (
		<Box display="flex" justifyContent="center">
			<MuiPagination count={totalPages} page={currentPage} onChange={handlePageChange} color="primary" />
		</Box>
	);
}
