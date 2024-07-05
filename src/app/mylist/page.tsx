import { Suspense } from "react";
import MovieMyList from "@/components/movies/MovieMyList/MovieMyList";
import Loading from "@/components/common/Loading/Loading";
import StoreProvider from "../StoreProvider";

export default function MyList() {
	return (
		<section>
			<Suspense fallback={<Loading />}>
				<StoreProvider>
					<MovieMyList />
				</StoreProvider>
			</Suspense>
		</section>
	);
}
