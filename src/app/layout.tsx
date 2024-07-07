import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "@/theme/theme";
import Menu from "@/components/Menu/Menu";
import "./globals.css";

export const metadata: Metadata = {
	title: "Prueba técnica - David Tojo",
	description: "Prueba técnica Frontend de David Tojo para Embermind Technologies",
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: "https://prueba-frontend-embermind-technologies.vercel.app/",
		title: "Prueba técnica - David Tojo",
		description: "Prueba técnica Frontend de David Tojo para Embermind Technologies",
		images: [
			{
				url: "https://prueba-frontend-embermind-technologies.vercel.app/img/og.png",
				width: 1200,
				height: 630,
				alt: "Movies App",
			},
		],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="es">
			<body>
				{/* enableCssLayer: Is overridden by anonymous layer styles when using Material UI with CSS Modules, Tailwind CSS, or even plain CSS without using @layer. */}
				<AppRouterCacheProvider options={{ enableCssLayer: true }}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<Menu />
						<main>{children}</main>
					</ThemeProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
