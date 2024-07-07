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

		// Verificar que el título está presente
		const titleElement = screen.getByText("Movies 🎬");
		expect(titleElement).toBeInTheDocument();

		// Verificar que el SearchBar se está renderizando
		const searchBarElement = screen.getByPlaceholderText("Buscar películas...");
		expect(searchBarElement).toBeInTheDocument();

		// Verificar que los enlaces de navegación se están renderizando
		const navLinksElement = screen.getByText("Mi lista");
		expect(navLinksElement).toBeInTheDocument();

		// Verificar que la página actual es "Inicio"
		const currentPageElement = screen.getByText("Inicio");
		expect(currentPageElement).toBeInTheDocument();
	});

	it("verifies that 'Inicio' is inside a div with classes 'link' and 'current-page'", async () => {
		await act(async () => {
			render(<Menu />);
		});

		const inicioElement = screen.getByText("Inicio").closest("div.link.current-page");
		expect(inicioElement).toBeInTheDocument();
	});

	it("verifies that 'Mi lista' is an anchor with href='/mylist' and class 'link'", async () => {
		await act(async () => {
			render(<Menu />);
		});

		const miListaElement = screen.getByText("Mi lista").closest("a.link");
		expect(miListaElement).toBeInTheDocument();
		expect(miListaElement).toHaveAttribute("href", "/mylist");
	});
});
