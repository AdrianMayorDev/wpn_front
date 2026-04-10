"use client";

import GameTable from "@/components/GameTable/GameTable";
import SidePanel from "@/components/SidePanel/SidePanel";
import { useLibrary } from "@/context/LibraryContext";
import useBeforeUnload from "@/hooks/useBeforeUnmount";
import useIsLogged from "@/hooks/useIsLogged";
import fetchUserLibrary from "@/services/fetchUserLibrary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
	const router = useRouter();
	const isLoggedIn = useIsLogged();
	const [isLoading, setIsLoading] = useState(true);
	const { setLibrary, totalGamesToSync } = useLibrary();

	useBeforeUnload();
	useEffect(() => {
		let interval: NodeJS.Timeout;

		if (isLoggedIn !== undefined) {
			setIsLoading(false);

			if (!isLoggedIn) {
				router.push("/login");
				return;
			}
		}

		const fetchLibrary = async () => {
			try {
				const library = await fetchUserLibrary();
				setLibrary(library);

				const user = library?.[0]?.userId;
				if (
					(library && library.length > 0 && library.length === totalGamesToSync) ||
					localStorage.getItem(`librarySynced_${user}`)
				) {
					localStorage.setItem(`librarySynced_${user}`, "true");
					clearInterval(interval);
				}
			} catch {
				// Library fetch handled silently during polling
			}
		};

		if (isLoggedIn) {
			interval = setInterval(fetchLibrary, 2000);
		}

		return () => clearInterval(interval);
	}, [isLoggedIn, router, setLibrary, totalGamesToSync]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<main>
				{isLoggedIn && <SidePanel />}
				{isLoggedIn && <GameTable />}
			</main>

			<footer></footer>
		</div>
	);
}
