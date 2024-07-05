"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/movies/MovieCard/MovieCard";
import { Box, CircularProgress, Grid } from "@mui/material";
import { MovieListItem, PaginatedMoviesResponse } from "@/models/movie.model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadLocalStorageGuestSession } from "@/utils/localStorage";
import { fetchGuestListMovies } from "@/features/movies/tmdbApi";
import Pagination from "@/components/common/Pagination/Pagination";

export default function MovieMyList() {
	const guestSession = useAppSelector((state) => state.session);
	const dispatch = useAppDispatch();
	const [data, setData] = useState<PaginatedMoviesResponse>();

	useEffect(() => {
		const loadGuestSession = async (dispatch: any) => {
			try {
				await loadLocalStorageGuestSession(dispatch);
			} catch (error) {
				console.error(error);
			}
		};
		loadGuestSession(dispatch);
	}, [dispatch]);

	useEffect(() => {
		if (!guestSession.guestSessionId) return;

		let isExpired = true;
		if (guestSession.expiresAt) isExpired = new Date(guestSession.expiresAt) < new Date();
		if (!isExpired) {
			const fetchMovies = async () => {
				const data = await fetchGuestListMovies(guestSession.guestSessionId ?? "", {});
				setData(data);
			};
			fetchMovies();
		}
	}, [guestSession]);

	return (
		<>
			{data ? (
				<>
					<Grid container spacing={3}>
						{data.results.map((movie: MovieListItem) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
								<MovieCard
									title={movie.title}
									posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
									releaseDate={movie.release_date}
								/>
							</Grid>
						))}
					</Grid>
					<Pagination currentPage={data.page} totalPages={data.total_pages} />
				</>
			) : (
				// TODO: Crear componente loading
				<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
					<CircularProgress />
				</Box>
			)}
		</>
	);
}
