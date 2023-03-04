import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMastodonAccount, useTopMastodonStatuses } from "@/hooks";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
	Card,
	CardBody,
	Container,
	Flex,
	Heading,
	Progress,
	Text,
} from "@chakra-ui/react";
import { MastodonDisplayName, MastodonStatusEmbed } from "@/components";
import Head from "next/head";
import { appName, separator } from "@/library";

const TopPosts: NextPage = () => {
	const router = useRouter();
	const accountName = router.query.account;
	const isAccountNameSet = typeof accountName === "string";
	const [, username, server] = isAccountNameSet ? accountName.split("@") : [];

	const { account } = useMastodonAccount({ server, username });

	const {
		error: statusesError,
		isLoading: isLoadingStatuses,
		progress: statusesLoadingProgress,
		topStatuses: statuses,
	} = useTopMastodonStatuses({ server, username });

	const title = account
		? [account.display_name, separator, appName].join(" ")
		: appName;

	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name="description"
					content={`Most favo(u)rited Mastodon posts by ${accountName}`}
				/>
			</Head>

			<Container>
				<Flex direction="column" gap={8}>
					<Heading as="h2" size="lg">
						Most-favo(u)rited Mastodon posts by{" "}
						{account ? <MastodonDisplayName account={account} /> : accountName}
						{account ? `(${accountName})` : null}
					</Heading>

					{isLoadingStatuses && (
						<Flex gap={4} alignItems="center">
							<Text>Loading</Text>
							<Progress
								flexGrow={1}
								height={4}
								isIndeterminate={statusesLoadingProgress === undefined}
								max={1}
								value={statusesLoadingProgress}
							/>
						</Flex>
					)}

					{statusesError && (
						<Alert status="error">
							<AlertIcon />
							<AlertTitle>Failed to get posts</AlertTitle>
							<AlertDescription>{statusesError.message}</AlertDescription>
						</Alert>
					)}

					<Flex
						as="ol"
						aria-busy={isLoadingStatuses}
						direction="column"
						gap={8}
					>
						{!isLoadingStatuses &&
							statuses &&
							statuses.map((status) => (
								<Card
									as="li"
									key={status.id}
									backgroundColor="#313543"
									size="sm"
								>
									<CardBody display="flex">
										<MastodonStatusEmbed
											id={status.id}
											server={server}
											username={username}
											style={{width: '100%'}}
										/>
									</CardBody>
								</Card>
							))}
					</Flex>
				</Flex>
			</Container>
		</>
	);
};

export default TopPosts;
