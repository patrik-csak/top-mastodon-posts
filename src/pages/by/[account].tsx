import { GetServerSideProps, NextPage } from "next";
import { MastodonStatus } from "@/types";
import { getTopPosts } from "@/lib/server";
import Script from "next/script";

interface Props {
  posts: MastodonStatus[];
  server: string;
  username: string;
}

const TopPosts: NextPage<Props> = ({ posts, server, username }) => {
  return (
    <>
      <Script src={`https://${server}/embed.js`} />

      <h1>
        @{username}@{server}&rsquo;s top Mastodon posts
      </h1>

      <ol>
        {posts.map((post) => (
          <li key={post.id}>
            <iframe
              allow="fullscreen"
              className="mastodon-embed"
              src={`https://${server}/@${username}/${post.id}/embed`}
              style={{ maxWidth: "100%", border: 0 }}
              width={400}
            />
          </li>
        ))}
      </ol>
    </>
  );
};

export default TopPosts;

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => {
  // todo : cache
  // https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props#caching-with-server-side-rendering-ssr

  const { account } = query;

  if (!account || typeof account !== "string") return { notFound: true };

  const [, username, server] = account.split("@");

  return {
    props: {
      posts: await getTopPosts({ server, username }),
      server,
      username,
    },
  };
};
