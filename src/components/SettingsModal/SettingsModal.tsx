"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./SettingsModal.module.css";
import updateUserService from "@/services/updateUserService";
import getStatusesService from "@/services/getStatusesService";
import deleteStatusService from "@/services/deleteStatusService";
import createStatusService from "@/services/createStatusService";
import updateStatusService from "@/services/updateStatusService";

interface Status {
	gameStatusId: string;
	name: string;
}

const SettingsModal = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: (arg0: boolean) => void }) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const [activeTab, setActiveTab] = useState<"account" | "statuses">("account");
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [statuses, setStatuses] = useState<Status[]>([]);
	const [newStatusName, setNewStatusName] = useState("");

	useEffect(() => {
		if (isModalOpen) {
			openModal();
			if (activeTab === "statuses") {
				fetchStatuses();
			}
		} else {
			closeModal();
		}
	}, [isModalOpen, activeTab]);

	const openModal = () => {
		if (dialogRef.current) {
			dialogRef.current.showModal();
		}
	};

	const closeModal = () => {
		if (dialogRef.current) {
			console.log("Closing modal ", dialogRef.current);
			dialogRef.current.close();
			setIsModalOpen(false);
		}
	};

	const fetchStatuses = async () => {
		try {
			const data = await getStatusesService();
			setStatuses(data);
		} catch (error) {
			console.error("Error fetching statuses:", error);
		}
	};

	const handleDeleteStatus = async (gameStatusId: string) => {
		try {
			await deleteStatusService(gameStatusId);
			setStatuses((prevStatuses) => prevStatuses.filter((status) => status.gameStatusId !== gameStatusId));
		} catch (error) {
			console.error("Error deleting status:", error);
		}
	};

	const handleCreateStatus = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const data = await createStatusService(newStatusName);

			setStatuses((prevStatuses) => [...prevStatuses, data.data]);
			console.log("New status created:", data);
			console.log("status ", statuses);
			setNewStatusName(""); // Limpia el campo de entrada
		} catch (error) {
			console.error("Error creating status:", error);
		}
	};

	const handleUpdateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await updateUserService({ email, password: currentPassword, newPassword });
			closeModal();
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	const handleUpdateStatus = (gameStatusId: string) => {
		const debounceTimeout = 500; // 500ms
		let timeoutId: NodeJS.Timeout;

		return (newName: string) => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(async () => {
				try {
					await updateStatusService(gameStatusId, newName);
					setStatuses((prevStatuses) =>
						prevStatuses.map((status) => (status.gameStatusId === gameStatusId ? { ...status, name: newName } : status))
					);
				} catch (error) {
					console.error("Error updating status:", error);
				}
			}, debounceTimeout);
		};
	};

	return (
		<dialog ref={dialogRef} className={styles.dialog}>
			<div className={styles.modalContainer}>
				<div className={styles.modalHeader}>
					<h2>Settings</h2>
					<button onClick={closeModal} className={styles.closeButton}>
						X
					</button>
				</div>
				<div className={styles.modalContent}>
					<div className={styles.tabContainer}>
						<button className={activeTab === "account" ? styles.activeTab : ""} onClick={() => setActiveTab("account")}>
							Account
						</button>
						<button className={activeTab === "statuses" ? styles.activeTab : ""} onClick={() => setActiveTab("statuses")}>
							Statuses
						</button>
					</div>
					<div className={styles.tabContent}>
						{activeTab === "account" && (
							<div className={styles.accountSection}>
								<h3>Update Account</h3>
								<form onSubmit={handleUpdateUser}>
									<label>
										Email:
										<input type='email' placeholder='Enter new email' onChange={(e) => setEmail(e.target.value)} />
									</label>
									<label>
										Current Password:
										<input
											type='password'
											placeholder='Enter current password'
											onChange={(e) => setCurrentPassword(e.target.value)}
										/>
									</label>
									<label>
										Password:
										<input
											type='password'
											placeholder='Enter new password'
											onChange={(e) => setNewPassword(e.target.value)}
										/>
									</label>
									<button>Update</button>
								</form>
							</div>
						)}
						{activeTab === "statuses" && (
							<div className={styles.statusesSection}>
								<h3>Manage Statuses</h3>
								<ul>
									{statuses.map((status) => (
										<li key={status.gameStatusId}>
											<input
												type='text'
												defaultValue={status.name}
												onChange={(e) => handleUpdateStatus(status.gameStatusId)(e.target.value)}
											/>
											<button onClick={() => handleDeleteStatus(status.gameStatusId)}>Delete</button>
										</li>
									))}
								</ul>
								<form onSubmit={handleCreateStatus}>
									<label>
										<br></br>
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
						)}
					</div>
				</div>
			</div>
		</dialog>
	);
};

export default SettingsModal;
