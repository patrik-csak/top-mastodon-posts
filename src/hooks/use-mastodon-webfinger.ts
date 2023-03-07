import useSwrImmutable from "swr/immutable";

export default function useMastodonWebfinger({
	server,
	username,
}: {
	server: string | undefined;
	username: string | undefined;
}) {
	const shouldFetch = Boolean(server && username);

	return useSwrImmutable<{ subject: string }>(
		shouldFetch
			? `https://${server}/.well-known/webfinger?resource=acct:${username}@${server}`
			: null
	);
}
