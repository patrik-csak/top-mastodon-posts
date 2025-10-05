import { ChakraProvider } from "@chakra-ui/react";
import * as Fathom from "fathom-client";
import type { AppProps } from "next/app";
import Router from "next/router";
import { useEffect } from "react";
import { SWRConfig } from "swr";
import { Layout } from "@/components";
import { swrFetcher, theme } from "@/library";

import "@/styles/globals.css";

Router.events.on("routeChangeComplete", (as, routeProps) => {
	if (!routeProps.shallow) Fathom.trackPageview();
});

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (process.env.NEXT_PUBLIC_FATHOM_ID === undefined) return;

		Fathom.load(process.env.NEXT_PUBLIC_FATHOM_ID);
	}, []);

	return (
		<>
			<ChakraProvider resetCSS theme={theme}>
				<SWRConfig
					value={{
						fetcher: swrFetcher,
					}}
				>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SWRConfig>
			</ChakraProvider>
		</>
	);
}
