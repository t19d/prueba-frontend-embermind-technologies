import dynamic from "next/dynamic";
import { Suspense } from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import NavLinks from "./NavLinks/NavLinks";
import SearchBarSkeleton from "./SearchBar/SearchBarSkeleton";
import "./Menu.css";

const SearchBar = dynamic(() => import("./SearchBar/SearchBar"));

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
		<AppBar position="static" sx={{ position: "sticky", top: 0, zIndex: 1 }} className="appbar">
			<Toolbar sx={toolbarStyle}>
				<Typography variant="h6" component="h1" className="title">
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
