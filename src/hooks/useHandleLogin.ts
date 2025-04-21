import { useState } from "react";
import { useLibrary } from "@/context/LibraryContext";
import loginService from "@/services/loginService";
import fetchUserLibrary from "@/services/fetchUserLibrary";

interface LoginValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

const useHandleLogin = () => {
	const { getLibrary, setLibrary } = useLibrary();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (values: LoginValues) => {
		console.log("Login values:", values);
		setLoading(true);
		setError(null);

		try {
			// Perform login
			console.log("Logging in...");
			await loginService(values);

			console.log("Login successful");
			const library = await fetchUserLibrary();

			console.log("Fetched library:", library);
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading, error };
};

export default useHandleLogin;
