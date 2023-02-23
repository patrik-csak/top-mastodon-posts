import { AccountSearch } from "@/components";
import Head from "next/head";
import { Container, Text, VStack } from "@chakra-ui/react";

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Container>
				<VStack align="flex-start" gap={4}>
					<Text>See a Mastodon account&rsquo;s most-favo(u)rited posts</Text>
					<AccountSearch />
				</VStack>
			</Container>
		</>
	);
}
