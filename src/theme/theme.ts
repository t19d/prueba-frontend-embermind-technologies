"use client";
import { Inter } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { amber } from "@mui/material/colors";
import "./links.css";

const inter = Inter({
	weight: ["300", "400", "500", "700"],
	subsets: ["latin"],
	display: "swap",
});

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: amber,
	},
	typography: {
		fontFamily: inter.style.fontFamily,
	},
	components: {},
});

export default theme;
