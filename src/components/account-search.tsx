import { useState } from "react";
import { useSearchMastodon } from "@/hooks";
import Link from "next/link";

export default function AccountSearch() {
  const server = "mastodon.social";

  const [query, setQuery] = useState<string | undefined>(undefined);
  const { data, error, isLoading } = useSearchMastodon({
    query,
    server,
    type: "accounts",
  });

  return (
    <div>
      <form>
        <label htmlFor="account-search">account</label>
        <input
          onInput={(event) => setQuery(event.target.value)}
          type="search"
          id="account-search"
        />
      </form>

      {isLoading ? (
        <p>loading...</p>
      ) : data ? (
        <ol>
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
                  <img src={account.avatar} alt="" style={{ width: 46 }} />
                  <div dangerouslySetInnerHTML={{ __html: displayName }} />
                  <div>{accountName}</div>
                </Link>
              </li>
            );
          })}
        </ol>
      ) : null}
    </div>
  );
}
