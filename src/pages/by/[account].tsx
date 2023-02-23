import { NextPage } from "next";
import Script from "next/script";
import { useRouter } from "next/router";
import { useMastodonAccount, useTopMastodonStatuses } from "@/hooks";
import { useEffect } from "react";
import {
	Box,
	Card,
	CardBody,
	Container,
	Flex,
	Heading,
	Progress,
	SimpleGrid,
	Text,
} from "@chakra-ui/react";

const TopPosts: NextPage = () => {
	const router = useRouter();
	const accountName = router.query.account;
	const isAccountNameSet = typeof accountName === "string";
	const [, username, server] = isAccountNameSet ? accountName.split("@") : [];

	const { account } = useMastodonAccount({ server, username });

	const {
		isLoading: isLoadingStatuses,
		progress: topStatusesLoadingProgress,
		topStatuses: statuses,
	} = useTopMastodonStatuses({ server, username });

	useEffect(() => {
		if (!isLoadingStatuses && statuses) {
			// @ts-ignore
			window?._mastodonTools?.embed();
		}
	}, [isLoadingStatuses, statuses]);

	return (
		<>
			<Script src="/scripts/mastodon-embed.js" />

			<Container>
				<Flex direction="column" gap={8}>
					<Heading as="h2" size="lg">
						Top Mastodon posts by{" "}
						{account?.display_name ?? `@${username}@${server}`}
					</Heading>

					{isLoadingStatuses && (
						<Flex gap={4} alignItems="center">
							<Text>Loading</Text>
							<Progress
								flexGrow={1}
								height={4}
								isIndeterminate={topStatusesLoadingProgress === undefined}
								max={1}
								value={topStatusesLoadingProgress}
							/>
						</Flex>
					)}

					<SimpleGrid
						as="ol"
						aria-busy={isLoadingStatuses}
						gap={8}
						minChildWidth={400}
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
									<CardBody>
										<Box
											as="iframe"
											allow="fullscreen"
											className="mastodon-embed"
											src={`https://${server}/@${username}/${status.id}/embed`}
											// style={{ border: 0, maxWidth: "100%" }}
											width="100%"
										/>
									</CardBody>
								</Card>
							))}
					</SimpleGrid>
				</Flex>
			</Container>
		</>
	);
};

export default TopPosts;
