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

interface MovieMyListProps {
	page: number;
}

export default function MovieMyList({ page }: MovieMyListProps) {
	const guestSession = useAppSelector((state) => state.session);
	const dispatch = useAppDispatch();
	const [data, setData] = useState<PaginatedMoviesResponse>();
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState<boolean>(false);

	const getGuestMovies = () => {
		setLoading(true);

		if (!guestSession.guestSessionId) return;

		let isExpired = true;
		if (guestSession.expiresAt) isExpired = new Date(guestSession.expiresAt) < new Date();
		if (!isExpired) {
			const fetchMovies = async () => {
				try {
					const data = await fetchGuestListMovies(guestSession.guestSessionId ?? "", { page });
					setData(data);
				} catch (error: any) {
					if (error.message) console.error(error.message);
				}
			};
			fetchMovies();
		}

		setLoading(false);
	};

	const refreshData = () => {
		setRefresh(true);
	};

	useEffect(() => {
		let isExpired = true;
		if (guestSession.expiresAt) isExpired = new Date(guestSession.expiresAt) < new Date();
		if (!guestSession || !guestSession.guestSessionId || !guestSession.success || isExpired) {
			const loadGuestSession = async (dispatch: any) => {
				try {
					await loadLocalStorageGuestSession(dispatch);
				} catch (error: any) {
					if (error.message) console.error(error.message);
				}
			};
			loadGuestSession(dispatch);
		}
	}, [dispatch]);

	useEffect(() => {
		getGuestMovies();
	}, [guestSession, page]);

	useEffect(() => {
		if (refresh) {
			setRefresh(false);
			getGuestMovies();
		}
	}, [refresh]);

	return loading ? (
		<Loading />
	) : !data || !data.results || data.results.length < 1 ? (
		<NoData />
	) : (
		<>
			<Grid container spacing={4}>
				{data.results.map((movie: MovieListItem) => (
					<Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
						<MovieCard movie={movie} refreshData={refreshData} />
					</Grid>
				))}
			</Grid>
			<Pagination currentPage={data.page} totalPages={data.total_pages} />
		</>
	);
}
