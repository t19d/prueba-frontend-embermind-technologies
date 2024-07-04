export type Type = "upcoming" | "top_rated" | "popular" | "now_playing";

export interface UrlMoviesParams {
	query?: string;
	page?: number;
	sort_by?: string;
	include_adult?: boolean;
	language?: string;
	region?: string; // ISO-3166-1 code
	id?: number;
}
