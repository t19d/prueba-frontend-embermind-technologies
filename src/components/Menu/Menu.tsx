import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchBar from "./SearchBar/SearchBar";
import NavLinks from "./NavLinks/NavLinks";
import { Suspense } from "react";
import SearchBarSkeleton from "./SearchBar/SearchBarSkeleton";

export default function Menu() {
	return (
		<AppBar position="static" color="primary">
			<Toolbar sx={{ display: "flex", gap: 2, justifyContent: "space-between" }}>
				<Typography variant="h6" component="h1">
					Movie App
				</Typography>

				<Suspense fallback={<SearchBarSkeleton />}>
					<SearchBar />
				</Suspense>

				<NavLinks />
			</Toolbar>
		</AppBar>
	);
}
