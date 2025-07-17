import { useState } from "react";
import { useMastodonSearch } from "@/hooks";
import Link from "next/link";
import {
	Avatar,
	Card,
	CardBody,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { MastodonDisplayName } from "@/components";
import { useDebounce } from "react-use";
import { constants } from "@/library";

const mastodonDotSocial = "mastodon.social";
const { mastodonSearchMinimumQueryLength } = constants;

export default function AccountSearch() {
	const [query, setQuery] = useState<string | undefined>(undefined);
	const [queryDebounced, setQueryDebounced] = useState<string | undefined>(
		undefined
	);
	const isQueryDebouncedTooShort =
		(queryDebounced?.length || Infinity) < mastodonSearchMinimumQueryLength;
	const { data, isLoading } = useMastodonSearch({
		query: queryDebounced,
		server: mastodonDotSocial,
		type: "accounts",
	});

	useDebounce(
		() => {
			setQueryDebounced(query);
		},
		500,
		[query]
	);

	return (
		<Flex direction="column" gap={4} width="100%">
			<form onSubmit={(event) => event.preventDefault()}>
				<FormControl isInvalid={isQueryDebouncedTooShort}>
					<FormLabel>Account</FormLabel>
					<InputGroup>
						<Input
							onInput={(event) =>
								setQuery((event.target as HTMLInputElement).value)
							}
							placeholder="e.g. @kottke@mastodon.social"
							type="search"
						/>
						{isLoading && (
							<InputRightElement pointerEvents="none">
								<Spinner size="sm" />
							</InputRightElement>
						)}
					</InputGroup>
					{isQueryDebouncedTooShort && (
						<FormErrorMessage>
							Enter at least {mastodonSearchMinimumQueryLength} characters
						</FormErrorMessage>
					)}
				</FormControl>
			</form>

			{data && (
				<Flex as="ol" direction="column" gap={4} listStyleType="none">
					{data.accounts.map((account) => {
						let [username, accountServer] = account.acct.split("@");
						accountServer = accountServer ?? mastodonDotSocial;

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
