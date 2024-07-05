"use client";
import React from "react";
import { Skeleton, TextField, InputAdornment, IconButton } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { usePathname } from "next/navigation";

export default function SearchBarSkeleton() {
	const pathname = usePathname();
	const isHomePage = pathname === "/";

	// Mostrar componente solo en la home
	if (!isHomePage) return null;

	return (
		<TextField
			sx={{ flex: 1 }}
			disabled
			placeholder="Buscar películas..."
			variant="outlined"
			size="small"
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<Skeleton variant="circular" width={24} height={24}>
							<IconButton edge="end">
								<ClearIcon />
							</IconButton>
						</Skeleton>
					</InputAdornment>
				),
			}}
		/>
	);
}
