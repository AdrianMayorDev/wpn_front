const getStatusesService = async () => {
	try {
		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch("http://localhost:8000/library/allStatus", {
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
		console.error("Error fetching statuses:", error);
		throw error;
	}
};

export default getStatusesService;
