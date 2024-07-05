"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/movies/MovieCard/MovieCard";
import { Grid } from "@mui/material";
import { Movie } from "@/models/movie.model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadLocalStorageGuestSession } from "@/utils/localStorage";
import { createGuestSession } from "@/features/movies/tmdbApi";

export default function MovieMyList() {
	const guestSession = useAppSelector((state) => state.session);
	const dispatch = useAppDispatch();
	const [movies, setMovies] = useState([]);

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

	return (
		<Grid container spacing={3}>
			{movies.map((movie: Movie) => (
				<Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
					<MovieCard title={movie.title} posterUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} releaseDate={movie.release_date} />
				</Grid>
			))}
		</Grid>
	);
}
