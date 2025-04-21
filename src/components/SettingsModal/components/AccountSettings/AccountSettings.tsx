import { useState } from "react";
import updateUserService from "@/services/updateUserService";
import styles from "./AccountSettings.module.css";

const AccountSettings = ({ closeModal }: { closeModal: () => void }) => {
	const [email, setEmail] = useState("");
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const token = sessionStorage.getItem("token");
	if (!token) {
		throw new Error("User is not authenticated.");
	}

	const handleUpdateUser = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await updateUserService({ email, password: currentPassword, newPassword });
			closeModal();
		} catch (error) {
			console.error("Error updating user:", error);
		}
	};

	const handleDeleteAccount = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const response = await fetch("http://localhost:8000/user/", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `${token}`,
				},
				body: JSON.stringify({
					password: currentPassword,
				}),
			});

			console.log("Response:", response);

			closeModal();
			sessionStorage.removeItem("token");
			localStorage.removeItem("rememberMe");
			window.location.reload();
		} catch (error) {
			console.error("Error deleting account:", error);
		}
	};

	return (
		<div className={styles.accountSection}>
			<h3>Update Account</h3>
			<form onSubmit={handleUpdateUser}>
				<label>
					Email:
					<input type='email' placeholder='Enter new email' onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label>
					Current Password:
					<input type='password' placeholder='Enter current password' onChange={(e) => setCurrentPassword(e.target.value)} />
				</label>
				<label>
					New Password:
					<input type='password' placeholder='Enter new password' onChange={(e) => setNewPassword(e.target.value)} />
				</label>
				<button>Update</button>
			</form>
			<form onSubmit={handleDeleteAccount}>
				<h3>Delete Account</h3>
				<label>
					Current Password:
					<input type='password' placeholder='Enter current password' onChange={(e) => setCurrentPassword(e.target.value)} />
				</label>
				<button className={styles.deleteAccountButton}>Delete</button>
			</form>
		</div>
	);
};

export default AccountSettings;
