# Prueba técnica Frontend Embermind Technologies

Este proyecto es una mini webapp desarrollada como parte de una prueba técnica para la posición de Frontend Developer en Embermind Technologies. La aplicación muestra un listado de películas populares, permite buscar películas y valorar las películas seleccionadas. Utiliza TheMovieDB API para obtener los datos de las películas.

## Despliegue

La aplicación está desplegada en Vercel y se puede acceder a través de la siguiente URL: [prueba-frontend-embermind-technologies.vercel.app](https://prueba-frontend-embermind-technologies.vercel.app/)

## Tecnologías Utilizadas

-   **React 18**: Para la construcción de la interfaz de usuario.
-   **Typescript**: Para asegurar la tipificación estática y mejorar la calidad del código.
-   **Next.js**: Para la creación de la aplicación y la gestión del enrutamiento.
-   **Redux Toolkit**: Para el manejo del estado global de la aplicación, incluyendo la sesión de usuario invitado.
-   **Material UI (MUI)**: Para la estilización de los componentes.
-   **React Testing Library y Jest**: Para la realización de pruebas unitarias y funcionales.
-   **Code Splitting y Lazy Loading**: Para optimizar la carga de componentes y mejorar el rendimiento de la aplicación.

## Estructura del Proyecto

-   **components**: Contiene las rutas de la aplicación.
-   **components**: Contiene los componentes reutilizables de la aplicación.
    -   **common**: Componentes que se pueden utilizar en varios sitios y que no pertenecen a un tipo en concreto.
    -   **Menu**: Componente que contiene la barra de navegación y la barra de búsqueda.
    -   **movies**: Componentes relacionados con las películas (grids y cards de las películas).
-   **features**: Contiene funcionalidades específicas de la aplicación.
-   **models**: Contiene los modelos de datos utilizados en la aplicación.
-   **redux**: Contiene los slices y store de Redux.
-   **theme**: Contiene la configuración y los estilos del tema de la aplicación.
-   **utils**: Contiene las funciones utilitarias.

## Decisiones Técnicas

### Estructura de Proyecto

> [Store project files outside of app](https://nextjs.org/docs/app/building-your-application/routing/colocation#store-project-files-outside-of-app)

Utilicé una estructura donde los directorios están fuera de `/app` por dos motivos:

-   Usar `/app` como directorio exclusivo para las rutas.
-   Hacer uso de la [estructura recomendada de Redux + APP Router Next.js](https://redux-toolkit.js.org/usage/nextjs#folder-structure).

### Uso de Redux Toolkit

-   **Motivación**: Elegí Redux porque ya lo había utilizado en proyectos personales y estaba más familiarizado con su funcionamiento. Redux Toolkit simplifica la configuración de Redux y proporciona herramientas poderosas para el manejo del estado global de la aplicación.
-   **Explicación Técnica**: Redux Toolkit ofrece una forma estándar y optimizada de escribir lógica de Redux, utilizando `createSlice` para crear reducers y actions, y `configureStore` para configurar el store de Redux. Esto reduce la cantidad de código y minimiza las posibilidades de errores.

### Librería de Componentes

> [MUI](https://mui.com/)

-   **Motivación**: MUI es una librería de componentes de React popular y bien soportada que facilita la creación de interfaces de usuario modernas y consistentes.
-   **Implementación**: Utilicé MUI para la estilización de los componentes, aprovechando sus temas y componentes predefinidos para una rápida y eficiente construcción de la interfaz.

### Manejo de Errores

-   **Motivación**: Mostrar errores de manera clara y manejarlos adecuadamente es crucial para una buena experiencia de usuario.
-   **Implementación**: Los errores se muestran por consola y, adicionalmente, hay componentes que muestran los errores directamente en la interfaz, como en el caso del input de valoración de películas que muestra los errores relacionados.

### Componentes de Carga Dinámica (Code Splitting y Lazy Loading)

-   **Motivación**: Mejorar el rendimiento de la aplicación y optimizar la carga de componentes.
-   **Implementación**: Usé `dynamic` de Next.js para cargar componentes de manera dinámica y `Suspense` para manejar la carga de componentes. Esto permite que solo se carguen los componentes necesarios cuando se requieren, reduciendo el tiempo de carga inicial de la aplicación.
-   **Ejemplo de Implementación**: Lo utilicé en dos componentes porque eran los que más sentido tenían para mí. Por ejemplo, en el siguiente ejemplo lo utilizo para el Dialog de valorar películas por 2 motivos. El primero, no tiene sentido montar el componente si no se va abrir. El segundo, evitar generar el guestSession si no es necesario (ya que el componente lo genera si no existe).

```javascript
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Loading from "@/components/common/Loading/Loading";
import { getImageUrlW780 } from "@/utils/movies";
import { convertToLocalDateES } from "@/utils/dates";
import { MovieListItem } from "@/models/movie.model";

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
			<Card role="button" onClick={handleClickOpen} sx={{ ...cardStyle, backgroundImage: `url(${posterUrl})` }}>
				<CardContent sx={{ width: "100%", backgroundColor: "#1b1b1be6" }}>
					<Typography gutterBottom variant="h6" component="h3">
						{movie.title}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Fecha de estreno: {convertToLocalDateES(movie.release_date)}
					</Typography>
					{movie.rating && (
						<Typography
							variant="h5"
							component="span"
							sx={{
								position: "absolute",
								top: "0",
								right: "0",
								backgroundColor: "#1b1b1be6",
								padding: "0.75rem",
								borderBottomLeftRadius: "4px",
								lineHeight: "1",
								fontWeight: "bold",
							}}
						>
							{movie.rating}
						</Typography>
					)}
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
```

## Pruebas

Las pruebas se han realizado utilizando **React Testing Library** y **Jest** para asegurar la funcionalidad y la calidad del código.

```javascript
import React from "react";
import { render, screen, act } from "@testing-library/react";
import Menu from "@/components/Menu/Menu";

jest.mock(
	"@/components/Menu/SearchBar/SearchBar",
	() =>
		function SearchBar() {
			return (
				<div>
					<div>
						<input placeholder="Buscar películas..." type="text" defaultValue="" />
						<div>
							<button type="button">
								<svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ClearIcon">
									<path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
								</svg>
							</button>
						</div>
						<fieldset aria-hidden="true">
							<legend>
								<span>&ZeroWidthSpace;</span>
							</legend>
						</fieldset>
					</div>
				</div>
			);
		}
);

jest.mock(
	"@/components/Menu/NavLinks/NavLinks",
	() =>
		function NavLinks() {
			return (
				<nav>
					<ul>
						<li>
							<div className="link current-page">
								<span>Inicio</span>
							</div>
						</li>
						<li>
							<a className="link" href="/mylist">
								<span>Mi lista</span>
							</a>
						</li>
					</ul>
				</nav>
			);
		}
);

describe("Menu", () => {
	it("renders without crashing and displays the title, search bar, and navigation links", async () => {
		await act(async () => {
			render(<Menu />);
		});

		// Verificar el título
		const titleElement = screen.getByText(/Movies/i);
		expect(titleElement).toBeInTheDocument();

		// Verificar la barra de búsqueda
		const searchBarElement = screen.getByPlaceholderText("Buscar películas...");
		expect(searchBarElement).toBeInTheDocument();

		// Verificar los enlaces de navegación
		const inicioElement = screen.getByText("Inicio");
		expect(inicioElement).toBeInTheDocument();

		const miListaElement = screen.getByText("Mi lista");
		expect(miListaElement).toBeInTheDocument();
	});

	it("verifica que 'Inicio' está dentro de un div con clases 'link' y 'current-page'", async () => {
		await act(async () => {
			render(<Menu />);
		});

		const inicioElement = screen.getByText("Inicio").closest("div.link.current-page");
		expect(inicioElement).toBeInTheDocument();
	});

	it("verifica que 'Mi lista' es un enlace con href='/mylist' y clase 'link'", async () => {
		await act(async () => {
			render(<Menu />);
		});

		const miListaElement = screen.getByText("Mi lista").closest("a.link");
		expect(miListaElement).toBeInTheDocument();
		expect(miListaElement).toHaveAttribute("href", "/mylist");
	});
});
```

## Instalación y Ejecución

1. Clona el repositorio:

```bash
git clone https://github.com/t19d/prueba-frontend-embermind-technologies.git
```

2. Navega al directorio del proyecto:

```bash
cd prueba-frontend-embermind-technologies
```

3. Instala las dependencias:

```bash
npm install
```

4. Ejecuta la aplicación en modo desarrollo:

```bash
npm run dev
```

5. Abre http://localhost:3000 en tu navegador para ver la aplicación.

## Mejoras y comentarios

1. Explicación de la Lógica en home y mylist:

    > En la página home, la lógica está implementada de una manera, mientras que en mylist está implementada de otra. Esto se debe a que home utiliza Redux (solo para el manejo del estado de las cards) y no quería que toda la página fuera client-side, mientras que mylist utiliza server-side rendering para manejar la lógica.

2. Bug al Cambiar entre inicio y mi lista:

    > Actualmente, hay un bug que ocurre al cambiar entre inicio y mi lista. El SearchBar no resetea el texto de búsqueda, lo cual puede confundir al usuario. Esta es una mejora pendiente por implementar para asegurar una mejor experiencia de usuario.

3. Endpoints:

    > En la descripción de la prueba estaba mal el endpoint para la lista de películas populares. Busqué en la documentación oficial y puse el correcto.

    > En la descripción de la prueba estaba mal el endpoint para crear una "guest session". Busqué en la documentación oficial y puse el correcto.

4. Fallo a partir de la página 501 (inclusive):

    > En la paginación devuelve que hay un total de 45003 páginas pero, al intentar acceder de la número 501 (inclusive) en adelante, falla la API.
