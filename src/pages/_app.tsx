import { NextUIProvider } from "@nextui-org/react";
import type { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { themes } from "@/library/client";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<NextThemesProvider
				attribute="class"
				value={{
					dark: themes.dark.className,
					light: themes.light.className,
				}}
			>
				<NextUIProvider>
					<Component {...pageProps} />
				</NextUIProvider>
			</NextThemesProvider>

			<Analytics />
		</>
	);
}
