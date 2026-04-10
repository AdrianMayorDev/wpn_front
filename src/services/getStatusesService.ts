const getStatusesService = async () => {
	try {
		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/library/allStatus`, {
			method: "GET",
			headers: {
				Authorization: `${token}`,
			},
		});

		const data = await response.json();

		if (data.status === "error") {
			throw new Error(data.message || "Failed to retrieve statuses.");
		}

		return data.data; // Devuelve la lista de estados
	} catch (error) {
		throw error;
	}
};

export default getStatusesService;
