import { useState, useEffect } from "react";
import deleteStatusService from "@/services/deleteStatusService";
import createStatusService from "@/services/createStatusService";
import updateStatusService from "@/services/updateStatusService";
import styles from "./StatusesSettings.module.css";
import { useLibrary } from "@/context/LibraryContext";

const StatusesSettings = () => {
	const { statuses, refreshStatuses } = useLibrary();
	const [newStatusName, setNewStatusName] = useState("");

	useEffect(() => {
		refreshStatuses();
	}, []);

	const handleDeleteStatus = async (gameStatusId: string) => {
		try {
			await deleteStatusService(gameStatusId);
			await refreshStatuses();
		} catch {
			// Error thrown by service
		}
	};

	const handleCreateStatus = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await createStatusService(newStatusName);
			setNewStatusName("");
			await refreshStatuses();
		} catch {
			// Error thrown by service
		}
	};

	const handleUpdateStatus = (gameStatusId: string) => {
		const debounceTimeout = 500;
		let timeoutId: NodeJS.Timeout;

		return (newName: string) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				try {
					await updateStatusService(gameStatusId, newName);
					await refreshStatuses();
				} catch {
					// Error thrown by service
				}
			}, debounceTimeout);
		};
	};

	return (
		<div className={styles.statusesSection}>
			<h3>Manage Statuses</h3>
			<ul>
				{statuses.map((status) => (
					<li key={status.gameStatusId}>
						<input
							type='text'
							defaultValue={status.name}
							onChange={(e) => handleUpdateStatus(status.gameStatusId)(e.target.value)}
							disabled={status.gameStatusId === "1"}
						/>
						{status.gameStatusId !== "1" && <button onClick={() => handleDeleteStatus(status.gameStatusId)}>Delete</button>}
					</li>
				))}
			</ul>
			<form onSubmit={handleCreateStatus}>
				<label>
					New Status:
					<input
						type='text'
						placeholder='Enter new status'
						value={newStatusName}
						onChange={(e) => setNewStatusName(e.target.value)}
					/>
				</label>
				<button type='submit'>Add</button>
			</form>
		</div>
	);
};

export default StatusesSettings;
