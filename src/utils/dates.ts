export function convertToLocalDateES(dateString: string): string {
	const date = new Date(dateString);

	// Si es una fecha inválida, devolver un "-"
	if (isNaN(date.getTime())) return "-";

	return date.toLocaleDateString("es-ES", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
}
