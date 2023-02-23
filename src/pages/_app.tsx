import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "@/components";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ChakraProvider>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>

			<Analytics />
		</>
	);
}
