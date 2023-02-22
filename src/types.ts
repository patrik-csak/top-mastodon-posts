export interface MastodonAccount {
  id: string;
  acct: string;
  avatar: string;
  display_name: string;
  emojis: Array<{
    shortcode: string;
    url: string;
  }>;
}

export interface MastodonStatus {
  id: string;
  favourites_count: number;
}
