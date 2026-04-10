import { useLibrary } from "@/context/LibraryContext";
import { useToast } from "@/components/Toast/Toast";
import { useEffect, useState } from "react";
import styles from "./GameTable.module.css";

interface Game {
	gameId: string;
	gameTitle: string;
	status: string;
	ratioUsersMainStory: number;
	mainStoryTime: number;
	usersScore: number;
	gameStatusId: string; // Nuevo campo para identificar el estado actual
}

interface GameStatus {
	gameStatusId: string;
	name: string;
}

const GameTable = () => {
	const token = sessionStorage.getItem("token");
	if (!token) {
		throw new Error("User is not authenticated.");
	}

	const { showToast } = useToast();
	const [games, setGames] = useState<Game[]>([]);
	const [statuses, setStatuses] = useState<GameStatus[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const { getLibrary, totalGamesToSync } = useLibrary();
	const [progress, setProgress] = useState(0);
	const [user, setUser] = useState<string | null>(null);

	useEffect(() => {
		const fetchGamesAndStatuses = async () => {
			try {
				// Fetch all statuses
				const statusResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/library/allStatus`, {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: `${token}`,
					},
				});
				const statusData = await statusResponse.json();
				setStatuses(statusData.data);

				// Fetch library games
				const libraryGames = await getLibrary();

				if (libraryGames) {
					if (!user) setUser(libraryGames[0]?.userId);
					// Actualizar el progreso
					setProgress((libraryGames?.length / totalGamesToSync) * 100);

					// Fetch game details for each game in the library
					const resolvedGames: Game[] = [];
					for (const libraryGame of libraryGames) {
						const gameResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/library/game/${libraryGame.gameId}`, {
							method: "GET",
							headers: {
								"Content-Type": "application/json",
								Authorization: `${token}`,
							},
						});
						const gameData = await gameResponse.json();

						// Find the status name for the game
						const gameStatus = statusData.data.find((status: GameStatus) => status.gameStatusId === libraryGame.gameStatusId);

						resolvedGames.push({
							gameId: gameData.data.gameId,
							gameTitle: gameData.data.gameTitle,
							status: gameStatus ? gameStatus.name : "Unknown",
							ratioUsersMainStory: gameData.data.ratioUsersMainStory,
							mainStoryTime: gameData.data.mainStoryTime,
							usersScore: gameData.data.usersScore,
							gameStatusId: libraryGame.gameStatusId, // Agregar el ID del estado actual
						});
					}

					// Ordenar los juegos por ratioUsersMainStory
					resolvedGames.sort((a, b) => b.ratioUsersMainStory - a.ratioUsersMainStory);

					setGames(resolvedGames);
				}
			} catch {
				// Fetch errors handled silently
			} finally {
				setIsLoading(false);
			}
		};

		fetchGamesAndStatuses();
	}, [token, getLibrary]);

	// Función para convertir segundos a horas
	const formatTimeToHours = (seconds: number): string => {
		const hours = (seconds / 3600).toFixed(2);
		return `${hours} hrs`;
	};

	// Función para asignar un nuevo estado a un juego
	const handleStatusChange = async (gameId: string, newStatusId: string) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/library/assign-status`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				body: JSON.stringify({ gameId, gameStatusId: newStatusId }),
			});

			const data = await response.json();

			if (data.status === "error") {
				showToast("Failed to assign status: " + data.message, "error");
			}

			// Actualizar el estado local del juego
			setGames((prevGames) =>
				prevGames.map((game) =>
					game.gameId === gameId
						? {
								...game,
								gameStatusId: newStatusId,
								status: statuses.find((s) => s.gameStatusId === newStatusId)?.name || "Unknown",
						  }
						: game
				)
			);
		} catch {
			// Status assignment error
		}
	};

	if (isLoading) {
		return <div>Loading games...</div>;
	}

	return (
		<div>
			{!localStorage.getItem(`librarySynced_${user}`) && (
				<div style={{ margin: "20px 0", textAlign: "center" }}>
					<div style={{ width: "80%", margin: "0 auto", backgroundColor: "#e0e0e0", borderRadius: "10px" }}>
						<div
							style={{
								width: `${progress}%`,
								backgroundColor: "#76c7c0",
								height: "20px",
								borderRadius: "10px",
								transition: "width 0.5s ease-in-out",
							}}
						></div>
					</div>
					<p>{`Progress: ${progress.toFixed(2)}%`}</p>
				</div>
			)}

			<table className={styles.gameTable}>
				<thead>
					<tr>
						<th>Title</th>
						<th>Status</th>
						<th>Ratio</th>
						<th>Game Hours</th>
						<th>Users Score</th>
					</tr>
				</thead>
				<tbody>
					{games.map((game) => (
						<tr key={game.gameId}>
							<td>{game.gameTitle}</td>
							<td>
								<select value={game.gameStatusId} onChange={(e) => handleStatusChange(game.gameId, e.target.value)}>
									{statuses.map((status) => (
										<option key={status.gameStatusId} value={status.gameStatusId}>
											{status.name}
										</option>
									))}
								</select>
							</td>
							<td>{game.ratioUsersMainStory.toFixed(6)}</td>
							<td>{formatTimeToHours(game.mainStoryTime)}</td>
							<td>{game.usersScore && game.usersScore.toFixed(1)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default GameTable;
