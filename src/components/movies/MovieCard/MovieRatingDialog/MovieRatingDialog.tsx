import { Button, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addRating } from "@/features/movies/tmdbApi";
import { MovieListItem } from "@/models/movie.model";
import { getImageUrlOriginal } from "@/utils/movies";
import { loadLocalStorageGuestSession } from "@/utils/localStorage";
import { convertToLocalDateES } from "@/utils/dates";

interface MovieRatingDialogProps {
	movie: MovieListItem;
	open: boolean;
	onClose: () => void;
	refreshData?: () => void;
}

export default function MovieRatingDialog({ movie, open, onClose, refreshData }: MovieRatingDialogProps) {
	const backdrop = getImageUrlOriginal(movie.backdrop_path);
	const guestSession = useAppSelector((state) => state.session);
	const dispatch = useAppDispatch();

	const [rating, setRating] = useState<number | undefined>(movie.rating);
	const [error, setError] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const loadGuestSession = async (dispatch: any) => {
			try {
				await loadLocalStorageGuestSession(dispatch);
			} catch (error) {
				console.error(error);
			}
		};
		loadGuestSession(dispatch);
	}, [dispatch]);

	const handleSubmit = async () => {
		setLoading(true);

		// ❌
		if (!rating || rating > 10 || rating < 0) {
			setError(`El valor de la calificación debe estar entre 0 y 10. Valor actual: ${rating}.`);
			setRating(undefined);
			setLoading(false);
			return;
		}
		if (rating % 0.5 !== 0) {
			setError("El valor tiene que ser múltiplo de 0,50.");
			setLoading(false);
			return;
		}
		if (rating === movie.rating) {
			setLoading(false);
			onClose();
			return;
		}
		if (!guestSession.guestSessionId) {
			setError("No se ha podido obtener la sesión de invitado. Inténtelo de nuevo.");
			setLoading(false);
			return;
		}

		let isExpired = true;
		if (guestSession.expiresAt) isExpired = new Date(guestSession.expiresAt) < new Date();
		if (!isExpired) {
			try {
				await addRating(rating ?? 0, `${movie.id}`, guestSession.guestSessionId);
				onClose();
				if (refreshData) refreshData();
			} catch (error) {
				console.error(error);
				setError("Error al calificar la película. Inténtelo de nuevo.");
			}
		}

		setLoading(false);
	};

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault();
		setRating(Number(event.target.value));
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle>{movie.title}</DialogTitle>
			<DialogContent>
				<CardMedia component="img" image={backdrop} alt={movie.title} />
				<Typography variant="body1" sx={{ mt: 2 }}>
					{movie.overview}
				</Typography>

				<Grid container>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Título original: {movie.original_title} ({movie.original_language})
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							ID: {movie.id}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Fecha de estreno: {convertToLocalDateES(movie.release_date)}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Popularidad: {movie.popularity}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Votos promedio: {movie.vote_average} ({movie.vote_count} votos)
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Para adultos: {movie.adult ? "Sí" : "No"}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							IDs de géneros: {movie.genre_ids.join(", ")}
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
							Video: {movie.video ? "Sí" : "No"}
						</Typography>
					</Grid>
				</Grid>

				{guestSession && (
					<TextField
						sx={{ mt: 4 }}
						margin="dense"
						id="rating"
						label="Califica esta película"
						type="number"
						fullWidth
						variant="filled"
						value={!rating ? "" : rating}
						onChange={handleRatingChange}
						InputProps={{
							inputProps: {
								min: 0,
								max: 10,
								step: 0.5,
							},
						}}
						onKeyUp={(event) => {
							if (event.key == "Enter") {
								event.preventDefault();
								handleSubmit();
							}
						}}
						helperText={error}
						error={!!error}
					/>
				)}
			</DialogContent>
			{guestSession && (
				<DialogActions>
					<Button onClick={onClose}>Cancelar</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? <CircularProgress /> : "Enviar"}
					</Button>
				</DialogActions>
			)}
		</Dialog>
	);
}
