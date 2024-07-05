import { AppBar, Toolbar, Typography } from "@mui/material";
import SearchBar from "./SearchBar/SearchBar";
import NavLinks from "./NavLinks/NavLinks";
import { Suspense } from "react";
import SearchBarSkeleton from "./SearchBar/SearchBarSkeleton";

const toolbarStyle = {
	display: "flex",
	gap: 2,
	justifyContent: "space-between",
	maxWidth: "1280px",
	width: "100%",
	marginInline: "auto",
};

export default function Menu() {
	return (
		<AppBar position="static">
			<Toolbar sx={toolbarStyle}>
				<Typography variant="h6" component="h1">
					Movies &#127916;
				</Typography>

				<Suspense fallback={<SearchBarSkeleton />}>
					<SearchBar />
				</Suspense>

				<NavLinks />
			</Toolbar>
		</AppBar>
	);
}
