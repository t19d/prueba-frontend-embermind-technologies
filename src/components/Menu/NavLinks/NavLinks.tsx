import { Box, List, ListItem, ListItemText } from "@mui/material";
import LinkMenu from "./LinkMenu/LinkMenu";

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
						<LinkMenu {...link} />
					</ListItem>
				))}
			</List>
		</Box>
	);
}
