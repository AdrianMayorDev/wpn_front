const deleteStatusService = async (gameStatusId: string) => {
	try {
		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch("http://localhost:8000/library/status", {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${token}`,
			},
			body: JSON.stringify({ gameStatusId }),
		});

		const data = await response.json();

		if (data.status === "error") {
			throw new Error(data.message || "Failed to delete status.");
		}

		return data;
	} catch (error) {
		console.error("Error deleting status:", error);
		throw error;
	}
};

export default deleteStatusService;
