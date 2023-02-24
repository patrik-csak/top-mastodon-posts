import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "@/components";
import { theme } from "@/library";

import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<ChakraProvider theme={theme}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ChakraProvider>
		</>
	);
}
