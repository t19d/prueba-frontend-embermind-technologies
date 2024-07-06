"use client";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { MovieListItem, PaginatedMoviesResponse } from "@/models/movie.model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loadLocalStorageGuestSession } from "@/utils/localStorage";
import { fetchGuestListMovies } from "@/features/movies/tmdbApi";
import MovieCard from "@/components/movies/MovieCard/MovieCard";
import Pagination from "@/components/common/Pagination/Pagination";
import Loading from "@/components/common/Loading/Loading";
import NoData from "@/components/common/NoData/NoData";

export default function MovieMyList() {
	const guestSession = useAppSelector((state) => state.session);
	const dispatch = useAppDispatch();
	const [data, setData] = useState<PaginatedMoviesResponse>();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadGuestSession = async (dispatch: any) => {
			try {
				await loadLocalStorageGuestSession(dispatch);
			} catch (error: any) {
				if (error.message) console.error(error.message);
			}
		};
		loadGuestSession(dispatch);
	}, [dispatch]);

	useEffect(() => {
		setLoading(true);

		if (!guestSession.guestSessionId) return;

		let isExpired = true;
		if (guestSession.expiresAt) isExpired = new Date(guestSession.expiresAt) < new Date();
		if (!isExpired) {
			const fetchMovies = async () => {
				try {
					const data = await fetchGuestListMovies(guestSession.guestSessionId ?? "", {});
					setData(data);
				} catch (error: any) {
					if (error.message) console.error(error.message);
				}
			};
			fetchMovies();
		}

		setLoading(false);
	}, [guestSession]);

	return !data || !data.results || data.results.length < 1 ? (
		loading ? (
			<Loading />
		) : (
			<NoData />
		)
	) : (
		<>
			<Grid container spacing={3}>
				{data.results.map((movie: MovieListItem) => (
					<Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
						<MovieCard movie={movie} />
					</Grid>
				))}
			</Grid>
			<Pagination currentPage={data.page} totalPages={data.total_pages} />
		</>
	);
}
