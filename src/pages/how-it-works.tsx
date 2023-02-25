import { NextPage } from "next";
import {
	Container,
	Flex,
	Heading,
	Text,
	Link as ChakraLink,
	Code,
	Spacer,
} from "@chakra-ui/react";
import NextLink from "next/link";

const HowItWorks: NextPage = () => (
	<>
		<Container>
			<Flex direction="column" gap={4}>
				<Heading as="h2">How It Works</Heading>

				<Spacer />

				<Heading as="h3" size="lg">
					Top Posts
				</Heading>

				<Text>
					When you view an account&rsquo;s top posts at{" "}
					<Code>{"/by/@{username}/{server}"}</Code>, your browser makes requests
					to <Code>{"{server}"}</Code>&rsquo;s public API to get all public
					posts by that account, sorts them by <Code>favourite_count</Code>{" "}
					descending, then displays the top 20 most-favo(u)rited posts.
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
					, your browser will make requests to{" "}
					<ChakraLink
						href="https://universeodon.com/api/v1/accounts/109349320508690443/statuses"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						https://universeodon.com/api/v1/accounts/109349320508690443/statuses
					</ChakraLink>
				</Text>

				<Spacer />

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
					, your browser makes requests requests to{" "}
					<ChakraLink
						href="https://mastodon.social/"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						mastodon.social
					</ChakraLink>
					&rsquo;s public search endpoint, e.g.{" "}
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

				<Spacer />

				<Heading as="h3" size="lg">
					Source Code
				</Heading>

				<Text>
					Source code is available on GitHub at{" "}
					<ChakraLink
						href="https://github.com/patrik-csak/top-mastodon-posts"
						fontWeight="bold"
						textDecoration="underline"
						textUnderlineOffset={2}
					>
						patrik-csak / top-mastodon-posts
					</ChakraLink>{" "}
				</Text>
			</Flex>
		</Container>
	</>
);

export default HowItWorks;
