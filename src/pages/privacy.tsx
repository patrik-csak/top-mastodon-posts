import { NextPage } from "next";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { InlineLink } from "@/components";

const Privacy: NextPage = () => (
	<>
		<Container>
			<Flex direction="column" gap={4}>
				<Heading as="h2">Privacy</Heading>

				<Text>
					Top Mastodon Posts retains no personal information or data. It has no
					backend, database, caching, logging, or ads. It uses{" "}
					<InlineLink href="https://usefathom.com">Fathom</InlineLink> for
					simple, privacy-first analytics.
				</Text>
			</Flex>
		</Container>
	</>
);

export default Privacy;
