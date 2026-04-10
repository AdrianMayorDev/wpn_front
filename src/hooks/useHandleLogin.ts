import { useState } from "react";
import loginService from "@/services/loginService";
import fetchUserLibrary from "@/services/fetchUserLibrary";

interface LoginValues {
	email: string;
	password: string;
	rememberMe: boolean;
}

const useHandleLogin = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (values: LoginValues) => {
		setLoading(true);
		setError(null);

		try {
			await loginService(values);
			await fetchUserLibrary();
		} catch (err) {
			setError(err instanceof Error ? err.message : "An unknown error occurred");
		} finally {
			setLoading(false);
		}
	};

	return { handleLogin, loading, error };
};

export default useHandleLogin;
