import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
	userId: string;
	email: string;
	steamAvatar: string;
	steamNick: string;
	steamUserId: string;
}

const useDecodedToken = () => {
	const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);

	useEffect(() => {
		const token = sessionStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode<DecodedToken>(token);
				setDecodedToken(decoded);
			} catch (error) {
				console.error("Failed to decode token:", error);
				setDecodedToken(null);
			}
			console.log("Decoded token:", decodedToken);
		} else {
			setDecodedToken(null);
		}
	}, []);

	console.log("Decoded token:", decodedToken);
	const { userId, email, steamAvatar, steamNick, steamUserId } = decodedToken || {};

	return { userId, email, steamAvatar, steamNick, steamUserId };
};

export default useDecodedToken;
