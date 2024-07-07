import { UrlMoviesParams } from "@/models/filter.model";
import { PaginatedMoviesResponse, RatingResponse } from "@/models/movie.model";
import { GuestSession } from "@/models/session.model";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchListMovies(opts: UrlMoviesParams): Promise<PaginatedMoviesResponse> {
	const url = opts.query ? getUrlListSearch(opts) : getUrlListPopular(opts);
	const response = await fetch(url);

	// ❌
	if (!response.ok) throw new Error(`ERROR ${response.status ?? 500} -  Error obteniendo las películas`);

	// ✅
	const data: PaginatedMoviesResponse = await response.json();
	return data;
}

export async function fetchGuestListMovies(guestSessionId: string, opts: UrlMoviesParams): Promise<PaginatedMoviesResponse> {
	const url = getUrlGuestListMovies(guestSessionId, opts);
	const response = await fetch(url);

	// ❌ Puede no haber valorado ninguna y saltar como error
	if (!response.ok) throw new Error(`ERROR ${response.status ?? 500} -  Error obteniendo las películas de la persona invitada`);

	// ✅
	const data: PaginatedMoviesResponse = await response.json();
	return data;
}

export async function addRating(rating: number, movieId: string, guestSessionId: string): Promise<RatingResponse> {
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json;charset=utf-8",
		},
		body: `{"value":${rating}}`,
	};
	const url = getUrlRating(movieId, guestSessionId);
	const response = await fetch(url, options);

	// ❌
	if (!response.ok) throw new Error(`ERROR ${response.status ?? 500} -  Error añadiendo una valoración`);

	// ✅
	const data: RatingResponse = await response.json();
	return data;
}

export async function createGuestSession(): Promise<GuestSession> {
	const response = await fetch(getUrlGestSession());

	// ❌
	if (!response.ok) throw new Error(`ERROR ${response.status ?? 500} -  Error creando la sesión para la persona invitada`);

	// ✅
	const data: GuestSession = await response.json();
	return data;
}

// #region utils URL MOVIES
function getUrlRating(movieId: string, guestSessionId: string): string {
	return `${API_URL}/movie/${movieId}/rating?guest_session_id=${guestSessionId}&api_key=${API_KEY}`;
}

function getUrlGestSession(): string {
	return `${API_URL}/authentication/guest_session/new?api_key=${API_KEY}`;
}

function getUrlListPopular(opts: UrlMoviesParams): string {
	return getUrlWithParams(`${API_URL}/movie/popular`, opts);
}

function getUrlListSearch(opts: UrlMoviesParams): string {
	return getUrlWithParams(`${API_URL}/search/movie`, opts);
}

function getUrlGuestListMovies(guestSessionId: string, opts: UrlMoviesParams): string {
	return getUrlWithParams(`${API_URL}/guest_session/${guestSessionId}/rated/movies`, opts);
}

function getUrlWithParams(url: string, { query, page = 1, language = "es-ES", region = "ES" }: UrlMoviesParams): string {
	let paramsString = `?api_key=${API_KEY}`;
	if (language) paramsString += `&language=${language}`;
	if (page) paramsString += `&page=${page}`;
	if (region) paramsString += `&region=${region}`;
	if (query) paramsString += `&query=${query}`;
	return url + paramsString;
}
// #endregion
