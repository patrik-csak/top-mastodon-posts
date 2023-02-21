import { MastodonStatus } from "@/types";
import got from "got";

// https://docs.joinmastodon.org/methods/accounts/#query-parameters
const limit = 40;

export default async function getTopPosts({
  server,
  username,
}: {
  server: string;
  username: string;
}): Promise<MastodonStatus[]> {
  const mastodonV1 = got.extend({ prefixUrl: `https://${server}/api/v1` });
  const mastodonV2 = got.extend({ prefixUrl: `https://${server}/api/v2` });

  const { accounts } = await mastodonV2
    .get("search", {
      searchParams: {
        type: "accounts",
        q: `@${username}@${server}`,
      },
    })
    .json<{ accounts: Array<{ id: string }> }>();

  const [account] = accounts;

  if (!account) throw new Error(`Account not found: @${username}@${server}`);

  let maxId: string | undefined = undefined;
  let moreStatuses: MastodonStatus[];
  let shouldGetMore = true;
  let statuses: MastodonStatus[] = [];

  while (shouldGetMore) {
    moreStatuses = await mastodonV1
      .get(`accounts/${account.id}/statuses`, {
        searchParams: {
          exclude_replies: true,
          exclude_reblogs: true,
          limit,
          max_id: maxId,
        },
      })
      .json<MastodonStatus[]>();

    for (const status of moreStatuses) statuses.push(status);

    shouldGetMore = moreStatuses.length === limit;

    if (shouldGetMore) {
      maxId = moreStatuses[moreStatuses.length - 1].id;
    }
  }

  statuses = statuses.filter((status) => status.favourites_count > 0);
  statuses.sort((a, b) => b.favourites_count - a.favourites_count);

  return statuses.slice(0, 20);
}
