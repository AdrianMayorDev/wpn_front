"use client";

import InputFieldText from "@/components/InputTextField/InputTextField";
import styles from "./SignupTextField.module.css";
import useSignupContext from "../../hooks/useSignupContext";
import { useRef, useState } from "react";

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
	const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

	// Function to fetch Steam data
	const fetchSteamData = async (username: string) => {
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/externalApi/${username}`);
			const data = await response.json();
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
		} catch {
			setSteamPlayer(null);
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
