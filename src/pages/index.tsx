import { AccountSearch } from "@/components";
import Head from "next/head";
import { Container, Text, VStack } from "@chakra-ui/react";

const title = "Top Mastodon Posts";
const description = "See a Mastodon account&rsquo;s most-favo(u)rited posts";

export default function Home() {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
			</Head>

			<Container>
				<VStack align="flex-start" gap={4}>
					<Text>{description}</Text>
					<AccountSearch />
				</VStack>
			</Container>
		</>
	);
}
