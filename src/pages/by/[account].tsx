import { NextPage } from "next";
import Script from "next/script";
import { useRouter } from "next/router";
import { useMastodonAccount, useTopMastodonStatuses } from "@/hooks";
import { useEffect } from "react";

const TopPosts: NextPage = () => {
  const router = useRouter();
  const accountName = router.query.account;
  const isAccountNameSet = typeof accountName === "string";
  const [, username, server] = isAccountNameSet ? accountName.split("@") : [];

  const { account } = useMastodonAccount({ server, username });

  const {
    isLoading: isLoadingStatuses,
    progress: topStatusesLoadingProgress,
    topStatuses: statuses,
  } = useTopMastodonStatuses({ server, username });

  useEffect(() => {
    if (!isLoadingStatuses && statuses) {
      // @ts-ignore
      window?._mastodonTools?.embed();
    }
  }, [isLoadingStatuses, statuses]);

  const humanReadableTopStatusesLoadingProgress = `${
    topStatusesLoadingProgress
      ? Math.round(topStatusesLoadingProgress * 100)
      : 0
  }%`;

  return (
    <>
      <Script src="/scripts/mastodon-embed.js" />

      <h1>
        {account?.display_name ?? `@${username}@${server}`}&rsquo;s top Mastodon
        posts
      </h1>

      <progress
        aria-label={`Loading posts (${humanReadableTopStatusesLoadingProgress})`}
        id="progress-bar"
        max={1}
        value={topStatusesLoadingProgress}
      />

      <ol aria-busy={isLoadingStatuses} aria-describedby="progress-bar">
        {!isLoadingStatuses &&
          statuses &&
          statuses.map((status) => (
            <li key={status.id}>
              <iframe
                allow="fullscreen"
                className="mastodon-embed"
                src={`https://${server}/@${username}/${status.id}/embed`}
                style={{ border: 0, maxWidth: "100%", width: 400 }}
              />
            </li>
          ))}
      </ol>
    </>
  );
};

export default TopPosts;
