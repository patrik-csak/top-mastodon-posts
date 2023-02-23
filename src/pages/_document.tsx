import { CssBaseline } from "@nextui-org/react";
import NextDocument, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
	DocumentInitialProps,
} from "next/document";
import React from "react";

export default class Document extends NextDocument {
	static async getInitialProps(
		context: DocumentContext
	): Promise<DocumentInitialProps> {
		const initialProps = await NextDocument.getInitialProps(context);

		return {
			...initialProps,
			styles: React.Children.toArray([initialProps.styles]),
		};
	}

	render() {
		return (
			<Html lang="en">
				<Head>{CssBaseline.flush()}</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
