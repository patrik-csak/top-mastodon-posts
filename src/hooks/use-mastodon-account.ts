import useSearchMastodon from "./use-search-mastodon";

export default function useMastodonAccount({
	server,
	username,
}: {
	server: string | undefined;
	username: string | undefined;
}) {
	const { data, error, isLoading } = useSearchMastodon({
		query: `@${username}@${server}`,
		server,
		type: "accounts",
	});

	return { account: data?.accounts[0], error, isLoading };
}
