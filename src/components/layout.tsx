import { ReactElement } from "react";
import {
	Box,
	Container,
	Flex,
	Heading,
	Show,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { appName, separator } from "@/library";
import { InlineLink } from "@/components";

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
							🔝🦣 {appName}
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
							<InlineLink href="https://www.patrikcsak.com/">
								Patrik Csak
							</InlineLink>
						</Text>

						<Show above="sm">{separator}</Show>

						<InlineLink href="/how-it-works" useNextLink>
							How It Works
						</InlineLink>

						<Show above="sm">{separator}</Show>

						<InlineLink href="/privacy" useNextLink>
							Privacy
						</InlineLink>
					</Flex>
				</Container>
			</Box>
		</Flex>
	);
}
