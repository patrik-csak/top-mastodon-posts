import { ReactElement } from "react";
import { Box, Container, Flex, Heading } from "@chakra-ui/react";

export default function Layout({ children }: { children: ReactElement }) {
	return (
		<Flex direction="column" gap={4} height="100%">
			<Box as="header" paddingY={4}>
				<Container>
					<Heading as="h1">🔝🐘 Top Mastodon Posts</Heading>
				</Container>
			</Box>
			<Box as="main" flexGrow={1} paddingY={4}>
				{children}
			</Box>
			<Box as="footer" paddingY={4} />
		</Flex>
	);
}
