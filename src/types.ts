export interface MastodonAccount {
	id: string;
	acct: string;
	avatar: string;
	display_name: string;
	emojis: Array<{
		shortcode: string;
		url: string;
	}>;
	statuses_count: number;
}

export interface MastodonStatus {
	id: string;
	favourites_count: number;
}
