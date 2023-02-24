import { MastodonAccount } from "@/types";
import { Box } from "@chakra-ui/react";

export default function MastodonDisplayName({
	account,
}: {
	account: MastodonAccount;
}) {
	return (
		<>
			{account.display_name.split(" ").map((part) => {
				const match = part.match(/^:(?<shortcode>[^:]+):$/);

				const shortcode = match?.groups?.shortcode;

				if (shortcode) {
					const emoji = account.emojis.find(
						(emoji) => emoji.shortcode === shortcode
					);

					if (!emoji) return null;

					return (
						<Box
							alt={`:${shortcode}:`}
							as="img"
							display="inline-block"
							height="1em"
							marginX=".125em"
							key={part}
							src={emoji.url}
						/>
					);
				}

				return `${part} `;
			})}
		</>
	);
}
