"use client";

import SidePanel from "@/components/SidePanel/SidePanel";
import useBeforeUnload from "@/hooks/useBeforeUnmount";
import useIsLogged from "@/hooks/useIsLogged";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import styles from "./page.module.css";

export default function Home() {
	const router = useRouter();
	const isLoggedIn = useIsLogged();
	const [isLoading, setIsLoading] = useState(true);

	useBeforeUnload();
	useEffect(() => {
		// Wait for the hook to resolve the logged-in status
		if (isLoggedIn !== undefined) {
			setIsLoading(false);

			if (!isLoggedIn) {
				console.log("Not Logged");
				router.push("/login");
			}
		}
	}, [isLoggedIn, router]);

	// Show a loading state while determining the logged-in status
	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<main>
				{isLoggedIn && (
					<div>
						hola<SidePanel></SidePanel>
					</div>
				)}
			</main>
			<footer></footer>
		</div>
	);
}
