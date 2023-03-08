import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { useDebounce, useWindowSize } from "react-use";

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
	const { width: windowWidth } = useWindowSize();

	function setHeight() {
		ref.current?.contentWindow?.postMessage({ id, type: "setHeight" }, "*");
	}

	useDebounce(setHeight, 500, [windowWidth]);

	useEffect(() => {
		function handleSetHeight(event: MessageEvent) {
			if (
				event.data.type !== "setHeight" ||
				event.data.id !== id ||
				event.source !== ref?.current?.contentWindow
			) {
				return;
			}

			console.log(`new height: ${event.data.height}`);

			ref.current.height = event.data.height;
		}

		window.addEventListener("message", handleSetHeight);

		return () => window.removeEventListener("message", handleSetHeight);
	}, [id]);

	return (
		<iframe
			allowFullScreen
			onLoad={setHeight}
			ref={ref}
			src={`https://${server}/@${username}/${id}/embed`}
			{...props}
		/>
	);
}
