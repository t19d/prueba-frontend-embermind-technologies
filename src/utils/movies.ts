const IMG_URL = process.env.NEXT_PUBLIC_TMDB_IMG_URL;
type Size = "w45" | "w92" | "w154" | "w185" | "w300" | "w342" | "w500" | "h632" | "w780" | "w1280" | "original";

export function getImageUrl(path: string, size: Size) {
	if (!path) return "/img/imagen_no_encontrada.jpeg";
	return `${IMG_URL}/${size}${path}`;
}

export function getImageUrlOriginal(path: string) {
	return getImageUrl(path, "original");
}

export function getImageUrlW780(path: string) {
	return getImageUrl(path, "w780");
}
