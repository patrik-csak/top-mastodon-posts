import { useState } from "react";
import { useSearchMastodon } from "@/hooks";
import Link from "next/link";
import { Card, Input, Loading, User } from "@nextui-org/react";

export default function AccountSearch() {
	const server = "mastodon.social";

	const [query, setQuery] = useState<string | undefined>(undefined);
	const { data, isLoading } = useSearchMastodon({
		query,
		server,
		type: "accounts",
	});

	return (
		<div>
			<form style={{ marginBottom: "1rem" }}>
				<Input
					clearable
					contentRight={isLoading ? <Loading size="xs" /> : null}
					css={{
						width: "100%",
					}}
					label="Account"
					onInput={(event) =>
						setQuery((event.target as HTMLInputElement).value)
					}
					placeholder="e.g. @georgetakei@universeodon.com"
					type="search"
				/>
			</form>

			{isLoading ? (
				<p>loading...</p>
			) : data ? (
				<ol
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						listStyle: "none",
						margin: 0,
					}}
				>
					{data.accounts.map((account) => {
						let displayName = account.display_name;
						for (const emoji of account.emojis) {
							displayName = displayName.replace(
								`:${emoji.shortcode}:`,
								`<img src='${emoji.url}' style='height: 1em'/>`
							);
						}

						let [username, accountServer] = account.acct.split("@");
						accountServer = accountServer ?? server;

						const accountName = `@${username}@${accountServer}`;

						return (
							<li key={account.id}>
								<Link href={`/by/${accountName}`}>
									<Card isHoverable isPressable>
										<Card.Body>
											<User
												src={account.avatar}
												name={
													<span
														dangerouslySetInnerHTML={{ __html: displayName }}
													/>
												}
												description={accountName}
											/>
										</Card.Body>
									</Card>
								</Link>
							</li>
						);
					})}
				</ol>
			) : null}
		</div>
	);
}
