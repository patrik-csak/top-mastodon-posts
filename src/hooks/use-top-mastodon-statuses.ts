import { MastodonStatus } from "@/types";
import useMastodonStatuses from "./use-mastodon-statuses";

export default function useTopMastodonStatuses({
  server,
  username,
}: {
  server: string;
  username: string;
}) {
  const { isLoading, progress, statuses } = useMastodonStatuses({
    server,
    username,
  });

  let topStatuses: MastodonStatus[] | undefined = statuses;

  if (topStatuses) {
    topStatuses = topStatuses.filter((status) => status.favourites_count > 0);
    topStatuses.sort((a, b) => b.favourites_count - a.favourites_count);
    topStatuses = topStatuses.slice(0, 10);
  }

  return { isLoading, progress, topStatuses };
}
