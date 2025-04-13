"use client";
import useIsLogged from "@/hooks/useIsLogged";
import LoginLayout from "@/layouts/LoginLayout/LoginLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
	const router = useRouter();
	const isLoggedIn = useIsLogged();
	const [isLoading, setIsLoading] = useState(true);
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

	return <LoginLayout />;
};

export default LoginPage;
