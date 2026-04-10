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
			} catch {
				setDecodedToken(null);
			}
		} else {
			setDecodedToken(null);
		}
	}, []);

	const { userId, email, steamAvatar, steamNick, steamUserId } = decodedToken || {};

	return { userId, email, steamAvatar, steamNick, steamUserId };
};

export default useDecodedToken;
