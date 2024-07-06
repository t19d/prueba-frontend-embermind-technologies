"use client";
import { MovieListItem } from "@/models/movie.model";
import { getImageUrlW780 } from "@/utils/movies";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/common/Loading/Loading";
import { convertToLocalDateES } from "@/utils/dates";

interface MovieCardProps {
	movie: MovieListItem;
	refreshData?: () => void;
}

const MovieRatingDialog = dynamic(() => import("./MovieRatingDialog/MovieRatingDialog"));

const cardStyle = {
	cursor: "pointer",
	position: "relative",
	aspectRatio: "2/3",
	backgroundSize: "cover",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	overflow: "hidden",
};

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
			<Card onClick={handleClickOpen} sx={{ ...cardStyle, backgroundImage: `url(${posterUrl})` }}>
				<CardContent sx={{ width: "100%", backgroundColor: "#1b1b1be6" }}>
					<Typography gutterBottom variant="h6" component="h3">
						{movie.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Fecha de estreno: {convertToLocalDateES(movie.release_date)}
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
