import { UrlMoviesParams } from "@/models/filter.model";
import { PaginatedMoviesResponse } from "@/models/movie.model";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchListMovies(opts: UrlMoviesParams) {
	const url = opts.query ? getUrlListSearch(opts) : getUrlListPopular(opts);
	const response = await fetch(url);

	// ❌
	if (!response.ok) throw new Error("🩺 Failed to fetch popular movies");

	// ✅
	const data: PaginatedMoviesResponse = (await response.json()) as PaginatedMoviesResponse;
	return data;
}

export async function createGuestSession() {
	const response = await fetch(getUrlGestSession());

	// ❌
	if (!response.ok) throw new Error("🩺 Failed to create guest session");

	// ✅
	const data = await response.json();
	return data;
}

// #region utils URL MOVIES
function getUrlGestSession(): string {
	return `${API_URL}/authentication/guest_session/new?api_key=${API_KEY}`;
}

function getUrlListPopular(opts: UrlMoviesParams): string {
	return getUrlWithParams(`${API_URL}/movie/popular`, opts);
}

function getUrlListSearch(opts: UrlMoviesParams): string {
	return getUrlWithParams(`${API_URL}/search/movie`, opts);
}

function getUrlWithParams(url: string, { query, page = 1, language = "es-ES", region = "ES" }: UrlMoviesParams): string {
	let paramsString = `?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`;
	if (query) paramsString += `&query=${query}`;
	return url + paramsString;
}
// #endregion
