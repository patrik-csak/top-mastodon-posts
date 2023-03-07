import { useMastodonSearch, useMastodonWebfinger } from "@/hooks";
import { useEffect, useState } from "react";

export default function useMastodonAccount({
	server,
	username,
}: {
	server: string | undefined;
	username: string | undefined;
}) {
	const [serverResolved, setServerResolved] = useState<string | undefined>(
		undefined
	);
	const [usernameResolved, setUsernameResolved] = useState<string | undefined>(
		undefined
	);

	const {
		data: webfingerData,
		error: webfingerError,
		isLoading: isWebfingerLoading,
	} = useMastodonWebfinger({
		server,
		username,
	});

	const {
		data: searchData,
		error: searchError,
		isLoading: isSearchLoading,
	} = useMastodonSearch({
		query: `@${usernameResolved}@${serverResolved}`,
		server: serverResolved,
		type: "accounts",
	});

	useEffect(() => {
		if (!webfingerData?.subject) return;

		const match = webfingerData.subject.match(
			/^acct:(?<username>[^@]+)+@(?<server>[^@]+)$/
		);

		const parsedServer = match?.groups?.server;
		const parsedUsername = match?.groups?.username;

		if (!(parsedServer && parsedUsername)) return;

		setUsernameResolved(parsedUsername);
		setServerResolved(parsedServer);
	}, [webfingerData?.subject]);

	return {
		account: searchData?.accounts?.[0],
		error: webfingerError || searchError,
		isLoading: isWebfingerLoading || isSearchLoading,
	};
}
