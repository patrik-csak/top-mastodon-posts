import { ReactElement } from "react";
import {
	Box,
	Container,
	Flex,
	Heading,
	Link as ChakraLink,
	Show,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { appName, separator } from "@/library";

export default function Layout({ children }: { children: ReactElement }) {
	const alternateBackgroundColor = useColorModeValue("gray.100", "gray.700");

	return (
		<Flex direction="column" gap={4} height="100%">
			<Box
				backgroundColor={alternateBackgroundColor}
				boxShadow="base"
				as="header"
				paddingY={4}
			>
				<Container>
					<NextLink href="/">
						<Heading as="h1" size="lg">
							🔝🐘 {appName}
						</Heading>
					</NextLink>
				</Container>
			</Box>

			<Box as="main" flexGrow={1} paddingY={4}>
				{children}
			</Box>

			<Box
				as="footer"
				backgroundColor={alternateBackgroundColor}
				boxShadow="base"
				paddingY={4}
			>
				<Container>
					<Flex direction={["column", "row"]} gap={4}>
						<Text>
							By{" "}
							<ChakraLink
								href="https://www.patrikcsak.com/"
								fontWeight="bold"
								textDecoration="underline"
								textUnderlineOffset={2}
							>
								Patrik Csak
							</ChakraLink>
						</Text>

						<Show above="sm">{separator}</Show>

						<ChakraLink
							as={NextLink}
							href="/how-it-works"
							fontWeight="bold"
							textDecoration="underline"
							textUnderlineOffset={2}
						>
							How It Works
						</ChakraLink>

						<Show above="sm">{separator}</Show>

						<ChakraLink
							as={NextLink}
							href="/privacy"
							fontWeight="bold"
							textDecoration="underline"
							textUnderlineOffset={2}
						>
							Privacy
						</ChakraLink>
					</Flex>
				</Container>
			</Box>
		</Flex>
	);
}
