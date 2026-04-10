import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/_theme.css";
import "@/styles/globals.css";
import LibraryProvider from "@/context/LibraryProvider";
import { ToastProvider } from "@/components/Toast/Toast";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "WPN - Game Library Manager",
	description: "Manage your Steam game library with custom statuses and tracking",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<LibraryProvider>
				<ToastProvider>
					<body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
				</ToastProvider>
			</LibraryProvider>
		</html>
	);
}
