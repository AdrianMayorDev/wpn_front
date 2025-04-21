const fetchUserLibrary = async () => {
	try {
		console.log("Fetching user library..."); // Debugging line to check if the function is called
		const token = sessionStorage.getItem("token");
		if (!token) {
			throw new Error("User is not authenticated.");
		}

		const response = await fetch("http://localhost:8000/library/", {
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
