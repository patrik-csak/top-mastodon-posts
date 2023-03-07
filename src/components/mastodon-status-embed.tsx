import { ComponentPropsWithoutRef, useEffect, useRef } from "react";

interface Props extends ComponentPropsWithoutRef<"iframe"> {
	id: string;
	server: string;
	username: string;
}

/**
 * @see https://github.com/mastodon/mastodon/blob/v4.1.0/public/embed.js
 */
export default function MastodonStatusEmbed({
	id,
	server,
	username,
	...props
}: Props) {
	const ref = useRef<HTMLIFrameElement>(null);

	useEffect(() => {
		function handleSetHeight(event: MessageEvent) {
			if (
				event.data.type !== "setHeight" ||
				event.data.id !== id ||
				event.source !== ref?.current?.contentWindow
			) {
				return;
			}

			ref.current.height = event.data.height;
		}

		window.addEventListener("message", handleSetHeight);

		return () => window.removeEventListener("message", handleSetHeight);
	}, [id]);

	return (
		<iframe
			allowFullScreen
			onLoad={({ target: iframe }) =>
				(iframe as HTMLIFrameElement).contentWindow?.postMessage(
					{ id, type: "setHeight" },
					"*"
				)
			}
			ref={ref}
			src={`https://${server}/@${username}/${id}/embed`}
			{...props}
		/>
	);
}
