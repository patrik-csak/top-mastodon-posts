import { NextPage } from "next";
import {
	Container,
	Flex,
	Heading,
	Text,
	Link as ChakraLink,
	Code,
} from "@chakra-ui/react";
import NextLink from "next/link";

const HowItWorks: NextPage = () => (
	<>
		<Container>
			<Flex direction="column" gap={4}>
				<Heading as="h2">How It Works</Heading>

				<Text>
					This website makes unauthenticated HTTP requests to public Mastodon
					APIs
				</Text>

				<Text>All HTTP requests are made from your browser, aka client</Text>

				<Text>
					There is no backend, database, caching, logging, or analytics
				</Text>

				<Heading as="h3" size="lg">
					Top Posts
				</Heading>

				<Text>
					When you view an account&rsquo;s top posts at{" "}
					<Code>{"/by/@{username}/{server}"}</Code>, this website makes a series
					of unauthenticated HTTP requests to <Code>{"{server}"}</Code>&rsquo;s
					public API to get all of <Code>{"{username}"}</Code>&rsquo;s posts,
					then sorts them by <Code>favourite_count</Code> descending.
				</Text>

				<Text>
					For example, for{" "}
					<ChakraLink
						as={NextLink}
						href="/by/@georgetakei@universeodon.com"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						@georgetakei@universeodon.com
					</ChakraLink>
					, this website will make requests to{" "}
					<ChakraLink
						href="https://universeodon.com/api/v1/accounts/109349320508690443/statuses"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						https://universeodon.com/api/v1/accounts/109349320508690443/statuses
					</ChakraLink>
				</Text>

				<Heading as="h3" size="lg">
					Search
				</Heading>

				<Text>
					When you{" "}
					<ChakraLink
						as={NextLink}
						href="/"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						search for an account
					</ChakraLink>
					, this website sends a public unauthenticated request to{" "}
					<ChakraLink
						href="https://mastodon.social/"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						mastodon.social
					</ChakraLink>
					, e.g.{" "}
					<ChakraLink
						href="https://mastodon.social/api/v2/search?q=georgetakei"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						https://mastodon.social/api/v2/search?q=georgetakei
					</ChakraLink>
					. It&rsquo;s the same request that{" "}
					<ChakraLink
						href="https://mastodon.social/search"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						mastodon.social&rsquo;s search page
					</ChakraLink>{" "}
					uses.
				</Text>
			</Flex>
		</Container>
	</>
);

export default HowItWorks;
