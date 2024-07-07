import { Grid } from "@mui/material";
import MovieCard from "@/components/movies/MovieCard/MovieCard";
import Pagination from "@/components/common/Pagination/Pagination";
import { MovieListItem, PaginatedMoviesResponse } from "@/models/movie.model";
import StoreProvider from "@/app/StoreProvider";
import NoData from "@/components/common/NoData/NoData";

interface MovieListProps {
	data: PaginatedMoviesResponse;
}

export default function MovieList({ data }: MovieListProps) {
	const { results: movies, page, total_pages: totalPages } = data;

	return (
		<>
			{!data || !movies || movies.length < 1 ? (
				<NoData />
			) : (
				<Grid container spacing={4}>
					{movies.map((movie: MovieListItem) => (
						<Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
							<StoreProvider>
								<MovieCard movie={movie} />
							</StoreProvider>
						</Grid>
					))}
				</Grid>
			)}

			{page && totalPages && <Pagination currentPage={page} totalPages={totalPages} />}
		</>
	);
}
