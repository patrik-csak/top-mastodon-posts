import { NextPage } from "next";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";

const Privacy: NextPage = () => (
	<>
		<Container>
			<Flex direction="column" gap={4}>
				<Heading as="h2">Privacy</Heading>

				<Text>
					This website retains no data. It has no backend, database, caching,
					logging, analytics, or ads. All HTTP requests are made from your
					browser to public Mastodon API endpoints.
				</Text>
			</Flex>
		</Container>
	</>
);

export default Privacy;
