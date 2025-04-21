"use client";

import GameTable from "@/components/GameTable/GameTable";
import SidePanel from "@/components/SidePanel/SidePanel";
import { useLibrary } from "@/context/LibraryContext";
import useBeforeUnload from "@/hooks/useBeforeUnmount";
import useIsLogged from "@/hooks/useIsLogged";
import fetchUserLibrary from "@/services/fetchUserLibrary";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import styles from "./page.module.css";

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
				console.log("Not Logged");
				router.push("/login");
				return;
			}
		}

		const fetchLibrary = async () => {
			try {
				// Wait for the hook to resolve the logged-in status

				// Fetch the user library
				const library = await fetchUserLibrary();
				console.log("Library:", library); // Debugging line to check the fetched library
				setLibrary(library); // Update the library context

				// Stop the interval if the condition is met
				const user = library?.[0]?.userId;
				if (
					(library && library.length > 0 && library.length === totalGamesToSync) ||
					localStorage.getItem(`librarySynced_${user}`)
				) {
					localStorage.setItem(`librarySynced_${user}`, "true");
					clearInterval(interval);
				}
			} catch (error) {
				console.error("Failed to fetch library:", error);
			}
		};

		// Set up the interval to fetch the library every 2 seconds
		if (isLoggedIn) {
			interval = setInterval(fetchLibrary, 2000);
		}

		// Cleanup the interval on component unmount
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
