import { useEffect } from "react";

const useBeforeUnload = () => {
	useEffect(() => {
		const handleBeforeUnload = () => {
			const rememberMe = localStorage.getItem("rememberMe");
			if (!rememberMe || rememberMe === "false") {
				sessionStorage.removeItem("token");
			}
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		// Clean the event listener on component unmount
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);
};

export default useBeforeUnload;
