import { Movie } from "@/models/movie.model";
import { Grid } from "@mui/material";
import MovieCard from "@/components/movies/MovieCard/MovieCard";
import Pagination from "@/components/common/Pagination/Pagination";

export default function MovieList(data: any) {
	const { results: movies, page, total_pages: totalPages } = data;

	return (
		<>
			<Grid container spacing={4}>
				{movies.map((movie: Movie) => (
					<Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
						<MovieCard title={movie.title} posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} releaseDate={movie.release_date} />
					</Grid>
				))}
			</Grid>
			<Pagination currentPage={page} totalPages={totalPages} />
		</>
	);
}
