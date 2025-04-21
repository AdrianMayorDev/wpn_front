"use client";

import InputFieldText from "@/components/InputTextField/InputTextField";
import styles from "./SignupTextField.module.css";
import useSignupContext from "../../hooks/useSignupContext";
import { useEffect, useRef, useState } from "react";

interface ISignupFieldProps {
	label: string;
	type: "password" | "text";
	placeholder: string;
}

interface ISteamPlayer {
	personaname: string;
	avatarfull: string;
	profileurl: string;
	steamid: string;
}

const labelToModelKeyMap: Record<string, string> = {
	"Steam Username": "steamNick",
	Email: "email",
	Password: "password",
	"Steam User ID": "steamUserId",
};

const SignupTextField = ({ label, type, placeholder }: ISignupFieldProps) => {
	const { values, setValue } = useSignupContext();
	const [steamPlayer, setSteamPlayer] = useState<ISteamPlayer | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	// Function to fetch Steam data
	const fetchSteamData = async (username: string) => {
		try {
			setIsLoading(true);
			const response = await fetch(`http://localhost:8000/externalApi/${username}`);
			const data = await response.json();
			console.log("Response data:", data);
			if (response.status === 404) {
				throw new Error("User not found");
			}
			const userSteam = data.response?.players[0] as ISteamPlayer;
			if (userSteam) {
				setSteamPlayer(userSteam);
				setValue("steamNick", userSteam.personaname);
				setValue("steamUserId", userSteam.steamid);
				setValue("steamAvatar", userSteam.avatarfull);
			} else {
				setSteamPlayer(null);
			}
		} catch (error) {
			console.error("Error fetching Steam data:", error);
			setSteamPlayer(null);
		} finally {
			setIsLoading(false);
		}
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value;

		// Use the mapped key for the model
		const modelKey = labelToModelKeyMap[label] || label.toLowerCase();
		setValue(modelKey as keyof typeof values, inputValue);
		// Only execute fetch logic for "Steam Username"
		if (label === "Steam Username") {
			// Clear previous debounce timeout
			if (debounceTimeout.current) {
				clearTimeout(debounceTimeout.current);
			}

			// Set new debounce timeout
			debounceTimeout.current = setTimeout(() => {
				if (inputValue.trim().length > 1) {
					console.log("se ejecuta el fetchSteamData", inputValue);
					fetchSteamData(inputValue);
				}
			}, 500); // Debounce API calls by 500ms
		}
	};

	return (
		<div className={styles.signupFieldContainer}>
			<label htmlFor={label.toLowerCase()}>{label}</label>
			<div className={styles.inputWithAvatar}>
				<InputFieldText
					type={type}
					placeholder={placeholder}
					value={(values[labelToModelKeyMap[label] as keyof typeof values] as string) || ""}
					onChange={handleInputChange}
				/>
				{steamPlayer && <img src={steamPlayer.avatarfull} alt='Steam Avatar' className={styles.steamAvatar} />}
			</div>
		</div>
	);
};

export default SignupTextField;
