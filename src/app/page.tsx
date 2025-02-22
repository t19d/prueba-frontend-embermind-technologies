import Loading from "@/components/common/Loading/Loading";
import MovieList from "@/components/movies/MovieList/MovieList";
import { fetchListMovies } from "@/features/movies/tmdbApi";
import { PaginatedMoviesResponse } from "@/models/movie.model";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const query = (searchParams?.query as string) ?? "";
	let searchParamPage = searchParams?.page ?? 1;
	// Convertir a número
	searchParamPage = Number(searchParamPage);

	const getPopularMovies = async (searchParamPage: number, query: string): Promise<PaginatedMoviesResponse> => {
		let data: PaginatedMoviesResponse = {
			results: [],
			page: 1,
			total_pages: 1,
			total_results: 1,
		};

		try {
			data = await fetchListMovies({
				page: searchParamPage,
				query,
			});
		} catch (error) {
			console.error(error);
		}

		return data;
	};

	// Llamar a la API
	let data = await getPopularMovies(searchParamPage, query);

	// Si no hay resultados, redirigir con la última página
	if ((!data.results || data.results.length === 0) && data.page != data.total_pages) {
		const newSearchParams: Record<string, string> = { page: `${data.total_pages}` };
		if (query) newSearchParams.query = query;

		// Añadir al query params la page
		const params = new URLSearchParams(newSearchParams);

		// Actualizar la URL con la nueva página
		redirect(`/?${params.toString()}`);
	}

	return (
		<section>
			<Suspense fallback={<Loading />}>
				<MovieList data={data} />
			</Suspense>
		</section>
	);
}
