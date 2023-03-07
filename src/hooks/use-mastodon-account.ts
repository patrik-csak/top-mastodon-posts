import useMastodonSearch from "./use-mastodon-search";

export default function useMastodonAccount({
	server,
	username,
}: {
	server: string | undefined;
	username: string | undefined;
}) {
	const { data, error, isLoading } = useMastodonSearch({
		query: `@${username}@${server}`,
		server,
		type: "accounts",
	});

	return { account: data?.accounts?.[0], error, isLoading };
}
