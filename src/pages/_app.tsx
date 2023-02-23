import {NextUIProvider} from "@nextui-org/react";
import type {AppProps} from "next/app";
import {ThemeProvider as NextThemesProvider} from "next-themes";
import {themes} from "@/library/client";

import "@/styles/globals.css";
import {Analytics} from "@vercel/analytics/dist/react";

export default function App({Component, pageProps}: AppProps) {
	return (<>
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

			<Analytics/>
		</>
	);
}
