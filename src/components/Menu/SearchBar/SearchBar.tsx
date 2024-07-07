"use client";
import { useEffect, useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClearIcon from "@mui/icons-material/Clear";

export default function SearchBar() {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const isHomePage = pathname === "/";

	const initialQuery = (searchParams.get("query") as string) ?? "";
	const [query, setQuery] = useState<string>(initialQuery);

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

			if (query !== initialQuery) {
				// Resetear la página a la 1
				params.set("page", "1");
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

	// Mostrar componente solo en la home
	if (!isHomePage) return null;

	return (
		<TextField
			sx={{ flex: 1 }}
			value={query}
			onChange={(e) => setQuery(e.target.value)}
			placeholder="Buscar películas..."
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
