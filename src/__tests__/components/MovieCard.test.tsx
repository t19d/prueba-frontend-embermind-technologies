import { render, screen } from "@testing-library/react";
import MovieCard from "@/components/movies/MovieCard/MovieCard";
import { MovieListItem } from "@/models/movie.model";
import "@testing-library/jest-dom";

// Definición del mock de una película para usar en las pruebas
const mockMovie: MovieListItem = {
	adult: false,
	backdrop_path: "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
	genre_ids: [1, 3, 27],
	id: 1022789,
	original_language: "en",
	original_title: "Inside Out 2",
	overview:
		"Riley, ahora adolescente, enfrenta una reforma en la Central de sus emociones. Alegría, Tristeza, Ira, Miedo y Asco deben adaptarse a la llegada de nuevas emociones: Ansiedad, Vergüenza, Envidia y Ennui. ¿Cómo manejarán este inesperado cambio?",
	popularity: 5416.001,
	poster_path: "/4HEJdpcmTGm3BWWic31G4aCnuC6.jpg",
	release_date: "2024-06-19",
	title: "Del revés 2 (Inside Out 2)",
	video: false,
	vote_average: 7.728,
	vote_count: 1428,
	rating: 8.5,
};

describe("MovieCard", () => {
	it("renders movie title and release date", () => {
		render(<MovieCard movie={mockMovie} />);

		// Verifica que el título de la película y la fecha de estreno estén presentes en el DOM renderizado
		expect(screen.getByText("Del revés 2 (Inside Out 2)")).toBeInTheDocument();
		expect(screen.getByText("Fecha de estreno: 19/06/2024")).toBeInTheDocument();
	});

	it("renders movie rating", () => {
		render(<MovieCard movie={mockMovie} />);

		// Verifica que la calificación de la película esté presente en el DOM renderizado
		expect(screen.getByText("8.5")).toBeInTheDocument();
	});

	it("does not render a rating of 9", () => {
		render(<MovieCard movie={mockMovie} />);

		// Verifica que una calificación de 9 no esté presente en el DOM renderizado
		expect(screen.queryByText("9")).toBeNull();
	});
});
