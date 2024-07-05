import { Box, List, ListItem, ListItemText } from "@mui/material";
import LinkMenu from "./LinkMenu/LinkMenu";
import { Suspense } from "react";
import LinkMenuSkeleton from "./LinkMenu/LinkMenuSkeleton";

export default function NavLinks() {
	const links = [
		{ text: "Inicio", href: "/" },
		{ text: "Mi lista", href: "/mylist" },
	];

	return (
		<Box component="nav">
			<List sx={{ display: "grid", gap: 1, gridTemplateColumns: "auto auto" }}>
				{links.map((link, i) => (
					<ListItem disablePadding key={i}>
						<Suspense fallback={<LinkMenuSkeleton text={link.text} />}>
							<LinkMenu {...link} />
						</Suspense>
					</ListItem>
				))}
			</List>
		</Box>
	);
}
