import { Card, CardContent, CardMedia, Typography } from "@mui/material";

interface MovieCardProps {
	title: string;
	posterUrl: string;
	releaseDate: string;
}

export default function MovieCard({ title, posterUrl, releaseDate }: MovieCardProps) {
	return (
		<Card>
			<CardMedia component="img" image={posterUrl} alt={title} />
			<CardContent>
				<Typography gutterBottom variant="h6" component="h3">
					{title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Release Date: {releaseDate}
				</Typography>
			</CardContent>
		</Card>
	);
}
