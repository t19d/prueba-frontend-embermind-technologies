import React from "react";
import { render, screen } from "@testing-library/react";
import Menu from "@/components/Menu/Menu";

jest.mock("@/components/Menu/SearchBar/SearchBar", () => function SearchBar() {
	return <div>SearchBar Mock</div>;
});
jest.mock("@/components/Menu/NavLinks/NavLinks", () => function NavLinks() {
	return <div>NavLinks Mock</div>;
});

describe("Menu", () => {
	it("renders without crashing and displays the title, search bar, and navigation links", () => {
		render(<Menu />);

		// Verificar que el título está presente
		const titleElement = screen.getByText("Movies 🎬");
		expect(titleElement).toBeInTheDocument();

		// Verificar que el SearchBar se está renderizando
		const searchBarElement = screen.getByText(/SearchBar Mock/i);
		expect(searchBarElement).toBeInTheDocument();

		// Verificar que los enlaces de navegación se están renderizando
		const navLinksElement = screen.getByText(/NavLinks Mock/i);
		expect(navLinksElement).toBeInTheDocument();
	});
});
