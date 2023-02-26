import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";

export default function InlineLink({
	children,
	useNextLink = false,
	...props
}: LinkProps & { useNextLink?: boolean }) {
	return (
		<ChakraLink
			as={useNextLink ? NextLink : undefined}
			fontWeight="bold"
			textDecoration="underline"
			textUnderlineOffset={2}
			{...props}
		>
			{children}
		</ChakraLink>
	);
}
