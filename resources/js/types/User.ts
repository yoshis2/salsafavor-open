export type User = {
  id: number;
  name: string;
  email: string;
  published: boolean;
};

export type UserProfile = {
  prefecture_id: number;
  address: string;
  image_url?: string;
  web: string;
  details: string;
};

export type UserPrefecture = {
  name: string;
};
