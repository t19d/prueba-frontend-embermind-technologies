import { Box, Typography } from "@mui/material";

export default function NoData() {
	return (
		<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
			<Typography variant="h4" component="span" color="textSecondary">
				No hay datos para mostrar
			</Typography>
		</Box>
	);
}
