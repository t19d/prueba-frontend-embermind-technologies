import MovieMyList from "@/components/movies/MovieMyList/MovieMyList";
import StoreProvider from "../StoreProvider";

export default function MyList() {
	return (
		<section>
			<StoreProvider>
				<MovieMyList />
			</StoreProvider>
		</section>
	);
}
