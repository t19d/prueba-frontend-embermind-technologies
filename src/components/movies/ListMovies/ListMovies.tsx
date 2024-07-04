export default function ListMovies(data: any) {
	const movies = data.results;
	const page = data.page;
	const totalPages = data.total_pages;
	const totalResults = data.total_results;

	return (
		<div>
			<h1>Lista de películas</h1>
			<ul>
				{movies.map((movie: any) => (
					<li key={movie.id}>{movie.title}</li>
				))}
			</ul>
			<p>
				Página {page} de {totalPages} ({totalResults} resultados)
			</p>
		</div>
	);
}
