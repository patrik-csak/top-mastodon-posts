import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "system",
	useSystemColorMode: true,
};

export default extendTheme({ config });
