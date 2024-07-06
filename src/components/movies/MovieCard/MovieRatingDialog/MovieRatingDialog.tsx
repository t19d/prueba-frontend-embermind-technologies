import { Button, CardMedia, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addRating } from "@/features/movies/tmdbApi";
import { MovieListItem } from "@/models/movie.model";
import { getImageUrlOriginal } from "@/utils/movies";
import { loadLocalStorageGuestSession } from "@/utils/localStorage";

interface MovieRatingDialogProps {
	movie: MovieListItem;
	open: boolean;
	onClose: () => void;
}

export default function MovieRatingDialog({ movie, open, onClose }: MovieRatingDialogProps) {
	const backdrop = getImageUrlOriginal(movie.backdrop_path);
	const guestSession = useAppSelector((state) => state.session);
	const dispatch = useAppDispatch();

	const [rating, setRating] = useState<number>();
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
		if (!rating || rating > 10 || rating < 0) setRating(undefined);
		if (!guestSession.guestSessionId) return;

		let isExpired = true;
		if (guestSession.expiresAt) isExpired = new Date(guestSession.expiresAt) < new Date();
		if (!isExpired) {
			try {
				await addRating(rating ?? 0, `${movie.id}`, guestSession.guestSessionId);
				onClose();
			} catch (error) {
				console.error(error);
				setError("Error al añadir la valoración");
			}
		}

		setLoading(false);
	};

	const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRating(Number(event.target.value));
	};

	return (
		<Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
			<DialogTitle>{movie.title}</DialogTitle>
			<DialogContent>
				<CardMedia component="img" image={backdrop} alt={movie.title} />
				<Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
					Fecha de estreno: {movie.release_date}
				</Typography>
				<Typography variant="body1" sx={{ mt: 2 }}>
					{movie.overview}
				</Typography>
				{guestSession && (
					<TextField
						margin="dense"
						id="rating"
						label="Rate this movie"
						type="number"
						fullWidth
						variant="standard"
						value={!rating ? "" : rating}
						onChange={handleRatingChange}
					/>
				)}
				{error && (
					<Typography variant="body2" color="error" sx={{ mt: 2 }}>
						{error}
					</Typography>
				)}
			</DialogContent>
			{guestSession && (
				<DialogActions>
					<Button onClick={onClose}>Cancel</Button>
					<Button onClick={handleSubmit} disabled={loading}>
						{loading ? <CircularProgress /> : "Submit"}
					</Button>
				</DialogActions>
			)}
		</Dialog>
	);
}
