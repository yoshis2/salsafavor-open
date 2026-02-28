import type { Genre, Prefecture } from "@/types/Master";

export type LessonImage = {
  id: number;
  image_url: string;
};

// フロントのレッスン一覧で使用する型
export type LessonItem = {
  id: number;
  name: string;
  frequency: string;
  week: string;
  start_time: string;
  end_time: string;
  genres: Genre[];
  place: string;
  instructor: string;
};

// フロントのレッスン詳細で使用する型
export type LessonDetail = {
  id: number;
  name: string;
  image_url?: string;
  user_id?: number;
  genres: Genre[];
  frequency: string;
  week: string;
  start_time: string;
  end_time: string;
  instructor: string;
  place: string;
  station: string;
  prefecture: Prefecture;
  address: string;
  price: string;
  details: string;
  web: string;
  mail: string;
  phone: string;
  images: LessonImage[];
};

// 管理画面のレッスン詳細で使用する型
export type Lesson = {
  id: number;
  name: string;
  instructor?: string | null;
  frequency: string;
  week: string;
  start_time: string;
  end_time: string;
  place?: string | null;
  station?: string | null;
  prefecture_id?: number | string | null;
  address?: string | null;
  price?: string | null;
  details?: string | null;
  web?: string | null;
  mail?: string | null;
  phone?: string | null;
  published?: boolean | number | null;
  images: LessonImage[];
};
