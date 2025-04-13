import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useIsLogged = () => {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState<boolean | undefined>(undefined);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, [router]);

	return isLoggedIn;
};
export default useIsLogged;
