import ky from "ky";

export default function swrFetcher(url: string) {
	return ky(url).json();
}
