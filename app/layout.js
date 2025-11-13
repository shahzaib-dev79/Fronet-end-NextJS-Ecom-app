import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContex";

const geistSans = {
	variable: "--font-geist-sans",
};

const geistMono = {
	variable: "--font-geist-mono",
};

export const metadata = {
	title: "My E-Commerce App",
	description: "Your favorite online store",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				{/* Inline script: remove known browser-extension attributes (e.g. Grammarly) before React hydration to avoid hydration mismatch */}
				<script
					dangerouslySetInnerHTML={{
						__html: `try{document.body.removeAttribute('data-new-gr-c-s-check-loaded');document.body.removeAttribute('data-gr-ext-installed');document.documentElement.removeAttribute('data-new-gr-c-s-check-loaded');document.documentElement.removeAttribute('data-gr-ext-installed');}catch(e){}`,
					}}
				/>
				<AuthProvider>
					<CartProvider>{children}</CartProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
