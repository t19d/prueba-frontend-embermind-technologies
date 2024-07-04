"use client";
import React, { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [query, setQuery] = useState<string>((searchParams.get("query") as string) ?? "");

	// Resetear la query
	const handleClear = () => {
		setQuery("");
	};

	// Efecto de debounce para actualizar la URL después de 250ms de inactividad
	useEffect(() => {
		const handler = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());
			if (!query) {
				// Eliminar el valor del input del query params
				params.delete("query");
			} else {
				// Poner el valor del input en el query params
				params.set("query", query);
			}
			const newSearchParams = params.toString();

			// Actualizar la URL con el nuevo tipo
			router.push(pathname + "?" + newSearchParams);
		}, 250);

		// Limpiar el timeout si el valor del input cambia antes de los 250ms
		return () => {
			clearTimeout(handler);
		};
	}, [query]);

	return (
		// TODO: Poner un max-width
		<TextField
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			placeholder="Buscar películas..."
			variant="outlined"
			size="small"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClear} edge="end">
							<ClearIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
