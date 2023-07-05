import { NextPage } from "next";
import { Container, Flex, Heading, Text, Code, Spacer } from "@chakra-ui/react";
import { InlineLink } from "@/components";
import { apostrophe } from "@/library";

const HowItWorks: NextPage = () => (
	<>
		<Container>
			<Flex direction="column" gap={4}>
				<Heading as="h2">How it works</Heading>

				<Spacer />

				<Heading as="h3" size="lg">
					Top posts
				</Heading>

				<Text>
					When you view an account{apostrophe}s top posts at{" "}
					<Code>{"/by/@{username}/{server}"}</Code>, your browser makes requests
					to <Code>{"{server}"}</Code>
					{apostrophe}s public API to get all public posts by that account,
					sorts them by <Code>favourite_count</Code> descending, then displays
					the top 20 most-favorited posts.
				</Text>

				<Text>
					For example, for{" "}
					<InlineLink href="/by/@georgetakei@universeodon.com" useNextLink>
						@georgetakei@universeodon.com
					</InlineLink>
					, your browser will make requests to{" "}
					<InlineLink href="https://universeodon.com/api/v1/accounts/109349320508690443/statuses">
						https://universeodon.com/api/v1/accounts/109349320508690443/statuses
					</InlineLink>
				</Text>

				<Spacer />

				<Heading as="h3" size="lg">
					Search
				</Heading>

				<Text>
					When you{" "}
					<InlineLink href="/" useNextLink>
						search for an account
					</InlineLink>
					, your browser makes requests requests to{" "}
					<InlineLink href="https://mastodon.social/">
						mastodon.social
					</InlineLink>
					{apostrophe}s public search endpoint, e.g.{" "}
					<InlineLink href="https://mastodon.social/api/v2/search?q=georgetakei">
						https://mastodon.social/api/v2/search?q=georgetakei
					</InlineLink>
					. It{apostrophe}s the same request that{" "}
					<InlineLink href="https://mastodon.social/search">
						mastodon.social{apostrophe}s search page
					</InlineLink>{" "}
					uses.
				</Text>

				<Spacer />

				<Heading as="h3" size="lg">
					Source code
				</Heading>

				<Text>
					Source code is available on GitHub at{" "}
					<InlineLink href="https://github.com/patrik-csak/top-mastodon-posts">
						patrik-csak / top-mastodon-posts
					</InlineLink>{" "}
				</Text>
			</Flex>
		</Container>
	</>
);

export default HowItWorks;
