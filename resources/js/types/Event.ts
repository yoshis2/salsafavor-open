import type { Genre, Prefecture } from "@/types/Master";

export type EventImage = {
  id: number;
  image_url: string;
};

// フロントのイベント一覧で使用する型
export type EventItem = {
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  genres: Genre[];
  dj: string;
  owner: string;
  lesson: boolean | number;
  performance: boolean | number;
  prefecture: Prefecture;
  place: string;
};

// フロントのイベント詳細で使用する型
export type EventDetail = {
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  genres: Genre[];
  lesson: boolean | number;
  performance: boolean | number;
  dj: string;
  place: string;
  station: string;
  prefecture: Prefecture;
  address: string;
  price: string;
  details: string;
  web: string;
  owner: string;
  mail: string;
  phone: string;
  created_date: string;
  images: EventImage[];
};

// 管理画面ののイベント詳細で使用する型
export type Event = {
  id: number;
  name: string;
  start_datetime: string;
  end_datetime: string;
  dj?: string | null;
  owner?: string | null;
  place?: string | null;
  station?: string | null;
  prefecture_id?: number | string | null;
  address?: string | null;
  price?: string | null;
  details?: string | null;
  web?: string | null;
  mail?: string | null;
  phone?: string | null;
  lesson?: number | boolean | null;
  performance?: number | boolean | null;
  published?: boolean | number | null;
  created_date?: string | null;
  images: EventImage[];
};
