import { MastodonAccount } from "@/types";
import useSWR from "swr";

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useSearchMastodon({
	query,
	server,
	type,
}: {
	query: string | undefined;
	server: string | undefined;
	type: "accounts";
}) {
	const shouldSearch = (query?.length ?? 0) >= 5 && server !== undefined;
	const { data, error, isLoading } = useSWR<{
		accounts: MastodonAccount[];
		error?: string;
	}>(
		shouldSearch
			? `https://${server}/api/v2/search?q=${query}&type=${type}`
			: null,
		fetcher
	);

	return {
		data: data?.error ? undefined : data,
		error: data?.error
			? new Error(
					`${server} returned the following error message : '${data.error}'`
			  )
			: error,
		isLoading,
	};
}
