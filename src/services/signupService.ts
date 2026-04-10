import { SignupFormValues } from "@/components/SignupComponent/context/SignupContextProvider";
import loginService from "./loginService";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const signupService = async (values: SignupFormValues) => {
	if (!values.email || !values.password || !values.steamNick || !values.steamUserId || !values.steamAvatar) {
		throw new Error("Please fill in all fields.");
	}

	const payload = {
		email: values.email,
		password: values.password,
		steamNick: values.steamNick,
		steamUserId: values.steamUserId,
		steamAvatar: values.steamAvatar,
	};

	const response = await fetch(`${API_URL}/user/`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(payload),
	});
	const data = await response.json();

	if (data.status === "error") {
		throw new Error(data.message || "Signup failed");
	}

	const token = await loginService({ email: values.email, password: values.password, rememberMe: values.rememberMe });

	const syncPayload = {
		steamNick: values.steamNick,
		steamId: values.steamUserId,
	};

	const syncResponse = await fetch(`${API_URL}/library/sync`, {
		method: "POST",
		headers: { "Content-Type": "application/json", Authorization: `${token}` },
		body: JSON.stringify(syncPayload),
	});

	const syncData = await syncResponse.json();
	return syncData.data;
};

export default signupService;
