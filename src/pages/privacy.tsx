import { NextPage } from "next";
import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { InlineLink } from "@/components";
import { apostrophe } from "@/library";

const Privacy: NextPage = () => (
	<>
		<Container>
			<Flex direction="column" gap={4}>
				<Heading as="h2">Privacy</Heading>

				<Text>
					Top Mastodon Posts retains no personal information or data. It has no
					backend, database, caching, logging, or ads. It uses{" "}
					<InlineLink href="https://vercel.com/analytics">
						Vercel{apostrophe}s privacy-friendly Audiences Analytics
					</InlineLink>
					.
				</Text>
			</Flex>
		</Container>
	</>
);

export default Privacy;
