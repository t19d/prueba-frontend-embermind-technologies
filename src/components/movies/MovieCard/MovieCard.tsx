"use client";
import { MovieListItem } from "@/models/movie.model";
import { getImageUrlW780 } from "@/utils/movies";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/common/Loading/Loading";

interface MovieCardProps {
	movie: MovieListItem;
	refreshData?: () => void;
}

const MovieRatingDialog = dynamic(() => import("./MovieRatingDialog/MovieRatingDialog"));

export default function MovieCard({ movie, refreshData }: MovieCardProps) {
	const posterUrl = getImageUrlW780(movie.poster_path);
	const [open, setOpen] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Card onClick={handleClickOpen} sx={{ cursor: "pointer" }}>
				<CardMedia component="img" image={posterUrl} alt={movie.title} />
				<CardContent>
					<Typography gutterBottom variant="h6" component="h3">
						{movie.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Fecha de estreno: {movie.release_date}
					</Typography>
				</CardContent>
			</Card>

			{open && (
				<Suspense fallback={<Loading />}>
					<MovieRatingDialog movie={movie} open={open} onClose={handleClose} refreshData={refreshData} />
				</Suspense>
			)}
		</>
	);
}
