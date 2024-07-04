"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import "./links.css";

const roboto = Roboto({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

const COLORS = {
	primary: {
		main: "#1976d2",
		contrastText: "#fff",
		light: "#42a5f5",
		dark: "#1565c0",
	},
	secondary: {
		main: "#9c27b0",
		contrastText: "#fff",
		light: "#ba68c8",
		dark: "#7b1fa2",
	},
	success: {
		main: "#4caf50",
		contrastText: "#fff",
		light: "#80e27e",
		dark: "#087f23",
	},
	warning: {
		main: "#ff9800",
		contrastText: "#fff",
		light: "#ffb74d",
		dark: "#f57c00",
	},
	error: {
		main: "#f44336",
		contrastText: "#fff",
		light: "#e57373",
		dark: "#d32f2f",
	},
	info: {
		main: "#2196f3",
		contrastText: "#fff",
		light: "#64b5f6",
		dark: "#1976d2",
	},
};

const theme = createTheme({
	palette: {
		mode: "dark",
		...COLORS,
	},
	typography: {
		fontFamily: roboto.style.fontFamily,
	},
	components: {},
});

export default theme;
