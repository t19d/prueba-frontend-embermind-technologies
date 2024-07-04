"use client";
import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar() {
	const [query, setQuery] = useState("");

	const handleSearch = () => {
		// TODO: Cambiar el listado
	};

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
						<IconButton onClick={handleSearch} edge="end">
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
