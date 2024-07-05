import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchBar from "./SearchBar/SearchBar";
import NavLinks from "./NavLinks/NavLinks";
import { Suspense } from "react";

export default function Menu() {
	return (
		<AppBar position="static" color="primary">
			<Toolbar sx={{ display: "grid", gap: 2, gridTemplateColumns: "auto 1fr auto" }}>
				<Typography variant="h6" component="h1">
					Movie App
				</Typography>

				{/* TODO: Mejorar */}
				<Suspense fallback={<div>Loading...</div>}>
					<SearchBar />
				</Suspense>

				<NavLinks />
			</Toolbar>
		</AppBar>
	);
}
