import { NextPage } from "next";
import Script from "next/script";
import { useRouter } from "next/router";
import { useMastodonAccount, useTopMastodonStatuses } from "@/hooks";
import { useEffect } from "react";
import { Card, Container, Grid, Progress, Text } from "@nextui-org/react";

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

	const humanReadableTopStatusesLoadingProgress = `${
		topStatusesLoadingProgress
			? Math.round(topStatusesLoadingProgress * 100)
			: 0
	}%`;

	return (
		<>
			<Script src="/scripts/mastodon-embed.js" />

			<Container css={{ display: "flex", flexDirection: "column", gap: "$12" }}>
				<Text h1>
					Top Mastodon posts by{" "}
					{account?.display_name ?? `@${username}@${server}`}
				</Text>

				{isLoadingStatuses && (
					<div style={{ alignItems: "center", display: "flex", gap: "1rem" }}>
						<Text>Loading</Text>
						<Progress
							aria-label={`Loading posts (${humanReadableTopStatusesLoadingProgress})`}
							id="progress-bar"
							indeterminated={topStatusesLoadingProgress === undefined}
							max={1}
							value={topStatusesLoadingProgress}
						/>
					</div>
				)}

				<Grid.Container
					aria-busy={isLoadingStatuses}
					aria-describedby="progress-bar"
					as="ol"
					gap={2}
				>
					{!isLoadingStatuses &&
						statuses &&
						statuses.map((status) => (
							<Grid
								as="li"
								key={status.id}
								xs={12}
								sm={6}
								md={4}
								alignItems="flex-start"
							>
								<Card css={{ backgroundColor: "#313543" }}>
									<Card.Body css={{ padding: "$5" }}>
										<iframe
											allow="fullscreen"
											className="mastodon-embed"
											src={`https://${server}/@${username}/${status.id}/embed`}
											style={{ border: 0, maxWidth: "100%" }}
										/>
									</Card.Body>
								</Card>
							</Grid>
						))}
				</Grid.Container>
			</Container>
		</>
	);
};

export default TopPosts;
