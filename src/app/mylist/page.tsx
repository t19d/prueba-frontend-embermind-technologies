import { Suspense } from "react";
import MovieMyList from "@/components/movies/MovieMyList/MovieMyList";
import Loading from "@/components/common/Loading/Loading";
import StoreProvider from "@/app/StoreProvider";

export default async function MyList({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	let searchParamPage = searchParams?.page ?? 1;
	// Convertir a número
	searchParamPage = Number(searchParamPage);

	return (
		<section>
			<Suspense fallback={<Loading />}>
				<StoreProvider>
					<MovieMyList page={searchParamPage} />
				</StoreProvider>
			</Suspense>
		</section>
	);
}
