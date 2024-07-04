import ListMovies from "@/components/movies/ListMovies/ListMovies";
import { fetchListMovies } from "@/features/tmdbApi";
import { PaginatedMoviesResponse } from "@/models/movie.model";

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

			// Si no hay resultados, llamar a la API con la última página
			if (!data.results || data.results.length === 0) {
				// Llamar a la API
				data = await fetchListMovies({
					page: searchParamPage,
					query,
				});
			}
		} catch (error) {
			console.error(error);
		}

		return data;
	};

	// Llamar a la API
	let data = await getPopularMovies(searchParamPage, query);

	return (
		<section>
			<ListMovies {...data} />
		</section>
	);
}
