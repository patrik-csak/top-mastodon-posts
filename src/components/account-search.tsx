import { useState } from "react";
import { useMastodonSearch } from "@/hooks";
import Link from "next/link";
import {
	Avatar,
	Card,
	CardBody,
	Flex,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Stack,
	Text,
} from "@chakra-ui/react";
import { MastodonDisplayName } from "@/components";

export default function AccountSearch() {
	const server = "mastodon.social";

	const [query, setQuery] = useState<string | undefined>(undefined);
	const { data, isLoading } = useMastodonSearch({
		query,
		server,
		type: "accounts",
	});

	return (
		<Flex direction="column" gap={4} width="100%">
			<form onSubmit={event => event.preventDefault()}>
				<Stack
					alignItems={["flex-start", "center"]}
					direction={["column", "row"]}
				>
					<Text as="label" htmlFor="search">
						Account
					</Text>
					<InputGroup>
						<Input
							onInput={(event) =>
								setQuery((event.target as HTMLInputElement).value)
							}
							placeholder="e.g. @georgetakei@universeodon.com"
							type="search"
						/>
						{isLoading && (
							<InputRightElement pointerEvents="none">
								<Spinner size="sm" />
							</InputRightElement>
						)}
					</InputGroup>
				</Stack>
			</form>

			{data && (
				<Flex as="ol" direction="column" gap={4} listStyleType="none">
					{data.accounts.map((account) => {
						let [username, accountServer] = account.acct.split("@");
						accountServer = accountServer ?? server;

						const accountName = `@${username}@${accountServer}`;

						return (
							<li key={account.id}>
								<Link href={`/by/${accountName}`}>
									<Card>
										<CardBody>
											<Flex gap={2} alignItems="center">
												<Avatar
													name={account.display_name}
													src={account.avatar}
												/>
												<Flex direction="column" gap={1}>
													<Heading
														as="h2"
														size="sm"
														display="flex"
														flexDirection="row"
														alignItems="center"
														gap={1}
													>
														<MastodonDisplayName account={account} />
													</Heading>
													<Text fontSize="sm" overflowWrap="break-word">
														{accountName}
													</Text>
												</Flex>
											</Flex>
										</CardBody>
									</Card>
								</Link>
							</li>
						);
					})}
				</Flex>
			)}
		</Flex>
	);
}
