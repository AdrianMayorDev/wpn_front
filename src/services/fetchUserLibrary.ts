const API_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchUserLibrary = async () => {
	try {
		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch(`${API_URL}/library/`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
		});
		const data = await response.json();

		if (data.status === "success") {
			return data.data;
		} else {
			throw new Error(data.message || "Failed to fetch library");
		}
	} catch (error) {
		throw new Error(error instanceof Error ? error.message : "An unknown error occurred");
	}
};

export default fetchUserLibrary;
