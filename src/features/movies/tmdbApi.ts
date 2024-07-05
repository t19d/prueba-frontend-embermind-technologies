import { UrlMoviesParams } from "@/models/filter.model";
import { PaginatedMoviesResponse, RatingResponse } from "@/models/movie.model";
import { GuestSession } from "@/models/session.model";

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function fetchListMovies(opts: UrlMoviesParams): Promise<PaginatedMoviesResponse> {
	const url = opts.query ? getUrlListSearch(opts) : getUrlListPopular(opts);
	const response = await fetch(url);

	// ❌
	if (!response.ok) throw new Error("🩺 Failed to fetch popular movies");

	// ✅
	const data: PaginatedMoviesResponse = await response.json();
	return data;
}

export async function fetchGuestListMovies(guestSessionId: string, opts: UrlMoviesParams): Promise<PaginatedMoviesResponse> {
	const url = `${API_URL}/guest_session/${guestSessionId}/rated/movies?api_key=${API_KEY}&language=es-ES&page=1`;
	const response = await fetch(url);

	// ❌ Puede no haber valorado ninguna y saltar como error
	if (!response.ok) throw new Error("🩺 Failed to fetch guest movies");

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
	if (!response.ok) throw new Error("🩺 Failed to add rating");

	// ✅
	const data: RatingResponse = await response.json();
	return data;
}

export async function createGuestSession(): Promise<GuestSession> {
	const response = await fetch(getUrlGestSession());

	// ❌
	if (!response.ok) throw new Error("🩺 Failed to create guest session");

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

function getUrlWithParams(url: string, { query, page = 1, language = "es-ES", region = "ES" }: UrlMoviesParams): string {
	let paramsString = `?api_key=${API_KEY}&language=${language}&page=${page}&region=${region}`;
	if (query) paramsString += `&query=${query}`;
	return url + paramsString;
}
// #endregion
