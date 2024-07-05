import MovieMyList from "@/components/movies/MovieMyList/MovieMyList";
import StoreProvider from "../StoreProvider";
import { Suspense } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function MyList() {
	// TODO: Mejorar
	return (
		<Suspense
			fallback={
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
					<CircularProgress />
				</Box>
			}
		>
			<section>
				<StoreProvider>
					<MovieMyList />
				</StoreProvider>
			</section>
		</Suspense>
	);
}
