"use client";
import { Skeleton } from "@mui/material";

interface LinkMenuProps {
	text: string;
}

export default function LinkMenuSkeleton({ text }: LinkMenuProps) {
	return (
		<Skeleton variant="text">
			<span>{text}</span>
		</Skeleton>
	);
}
