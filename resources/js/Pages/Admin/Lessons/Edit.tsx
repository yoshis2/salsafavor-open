import React, { type SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ImageSorter, { SortableImage } from "@/Components/Admin/ImageSorter";
import type { Lesson } from "@/types/Lesson";
import type { Genre } from "@/types/Master";
import { frequencyOptions, weekOptions } from "@/constants/lesson";

type Props = {
  lesson: Lesson;
  genreIDs: number[];
  genres: Genre[];
  prefectures: Record<string, string>;
};

const LESSON_IMAGE_BASE = "/storage/lessons/";

const toFlag = (value?: boolean | number | string | null) =>
  value === true || value === 1 || value === "1" ? "1" : "0";

const getCsrfHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {};

  // metaタグがあれば X-CSRF-TOKEN として設定
  const meta = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
  if (meta) {
    headers["X-CSRF-TOKEN"] = meta;
  }

  // cookieがあれば X-XSRF-TOKEN として設定
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  if (match) {
    headers["X-XSRF-TOKEN"] = decodeURIComponent(match[1]);
  }

  return headers;
};

declare function route(name: string, params?: Record<string, unknown> | number | string): string;

const Edit: React.FC<Props> = ({ lesson, genreIDs, genres, prefectures }) => {
  const imageBaseUrl = `${LESSON_IMAGE_BASE}${lesson.id}`;
  const initialImages = React.useMemo<SortableImage[]>(
    () =>
      (lesson.images ?? []).map((image) => ({
        id: image.id,
        url: `${imageBaseUrl}/${image.image_url}`,
        isNew: false,
      })),
    [lesson.images, lesson.id, imageBaseUrl],
  );
  const [images, setImages] = React.useState<SortableImage[]>(initialImages);
  const [imageError, setImageError] = React.useState<string | null>(null);
  const [imageProcessing, setImageProcessing] = React.useState(false);
  const lastInitialImagesRef = React.useRef(initialImages);

  React.useEffect(() => {
    if (lastInitialImagesRef.current !== initialImages) {
      setImages(initialImages);
      lastInitialImagesRef.current = initialImages;
    }
  }, [initialImages]);

  const { data, setData, post, processing, errors } = useForm({
    id: lesson.id,
    name: lesson.name ?? "",
    genre_ids: genreIDs ?? [],
    instructor: lesson.instructor ?? "",
    frequency: lesson.frequency ?? frequencyOptions[0]?.value ?? "",
    week: lesson.week ?? weekOptions[0]?.value ?? "",
    start_time: lesson.start_time ?? "",
    end_time: lesson.end_time ?? "",
    place: lesson.place ?? "",
    station: lesson.station ?? "",
    prefecture_id: lesson.prefecture_id ?? Object.keys(prefectures)[0] ?? "",
    address: lesson.address ?? "",
    price: lesson.price ?? "",
    details: lesson.details ?? "",
    web: lesson.web ?? "",
    mail: lesson.mail ?? "",
    phone: lesson.phone ?? "",
    published: toFlag(lesson.published),
    _method: "put",
  });

  const handleGenreToggle = (id: number, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...data.genre_ids, id]))
      : data.genre_ids.filter((value) => value !== id);
    setData("genre_ids", next);
  };
  const handleAutoUpload = (files: File[]) => {
    if (imageProcessing) return;
    setImageError(null);

    if (files.length === 0) return;

    const formData = new FormData();
    formData.append("id", String(lesson.id));
    files.forEach((file) => formData.append("files[]", file));

    const url = typeof route === "function" ? route("admin.lesson.images.upload") : "/admin/lesson/images";
    setImageProcessing(true);
    fetch(url, {
      method: "POST",
      headers: {
        ...getCsrfHeaders(),
      },
      body: formData,
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          throw new Error(data.error ?? data.message ?? "画像のアップロードに失敗しました。");
        }

        const uploadedImages = Array.isArray(data.images)
          ? data.images.map((image: { id: number; image_url: string }) => ({
              id: image.id,
              url: `${imageBaseUrl}/${image.image_url}`,
              isNew: false,
            }))
          : [];

        setImages((prevImages) => {
          const persisted = prevImages.filter((image) => !image.isNew);
          return [...persisted, ...uploadedImages];
        });
      })
      .catch((error: Error) => {
        setImageError(error.message);
        setImages((prevImages) => prevImages.filter((image) => !image.isNew));
      })
      .finally(() => {
        setImageProcessing(false);
      });
  };

  const handleImageReorder = (nextImages: SortableImage[]) => {
    const imageIds = nextImages.filter((image) => !image.isNew).map((image) => image.id);
    if (imageIds.length === 0) return;

    const url = typeof route === "function" ? route("admin.lesson.images.reorder") : "/admin/lesson/images";
    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json", // ←【重要】これを追加（JSONでのエラーレスポンスを受け取るため）
        ...getCsrfHeaders(),
      },
      credentials: "same-origin", // ← 追加
      body: JSON.stringify({
        id: lesson.id,
        image_ids: imageIds,
      }),
    })
      .then(async (response) => {
        console.log("Reorder response:", response);
        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.message || data.error || "画像の並び替えに失敗しました。");
        }
      })
      .catch((error: Error) => {
        setImageError(error.message ?? "画像の並び替えに失敗しました。");
      });
  };

  const handleImageRemove = async (image: SortableImage) => {
    if (image.isNew) return;
    if (!window.confirm("この画像を削除してもよろしいですか？")) return;

    const url =
      typeof route === "function" ? route("admin.lesson.images.delete", image.id) : `/admin/lesson/images/${image.id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        ...getCsrfHeaders(),
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("画像の削除に失敗しました。");
    }
  };

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const url = typeof route === "function" ? route("admin.lessons.update") : "/admin/lessons";
    post(url, { forceFormData: true });
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <article className="w-full">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">レッスン情報編集</h1>

          <div className="mb-8">
            {imageError && (
              <div
                id="image-upload-error"
                className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700"
              >
                {imageError}
              </div>
            )}
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                    画像(順番変更可)
                    <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                      必須
                    </span>
                  </td>
                  <th className="w-3/4 p-3" colSpan={3}>
                    <ImageSorter
                      images={images}
                      setImages={setImages}
                      onReorder={handleImageReorder}
                      onRemove={handleImageRemove}
                      onUpload={handleAutoUpload}
                      disabled={imageProcessing}
                      imageClassName="w-full aspect-[4/3] object-cover object-center rounded border border-gray-300"
                    />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>

          <form onSubmit={handleSubmit}>
            {/* CSRFトークン不一致エラー表示 */}
            {errors && typeof errors === "object" && (
              <>
                {Object.values(errors).some(
                  (msg) => typeof msg === "string" && (msg.includes("CSRF") || msg.includes("419")),
                ) && (
                  <div className="mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
                    セッションの有効期限が切れたか、CSRFトークンが一致しません。
                    <br />
                    <strong>ページを再読み込みしてください。</strong>
                  </div>
                )}
              </>
            )}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      レッスン名{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="name"
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        placeholder="毎週サルサ on1 レッスン 2021"
                        autoComplete="do-not-autofill"
                        required
                      />
                      {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">音楽ジャンル</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <div className="flex flex-wrap gap-4">
                        {genres.map((genre) => (
                          <label
                            key={genre.id}
                            className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer"
                          >
                            <input
                              name="genre_ids[]"
                              type="checkbox"
                              value={genre.id}
                              checked={data.genre_ids.includes(genre.id)}
                              onChange={(e) => handleGenreToggle(genre.id, e.target.checked)}
                              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                            />
                            <span>{genre.name}</span>
                          </label>
                        ))}
                      </div>
                      {errors.genre_ids && <div className="mt-1 text-sm text-red-600">{errors.genre_ids}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">インストラクター</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="instructor"
                        type="text"
                        value={data.instructor}
                        onChange={(e) => setData("instructor", e.target.value)}
                        placeholder="テスト ゴンザレス"
                      />
                      {errors.instructor && <div className="mt-1 text-sm text-red-600">{errors.instructor}</div>}
                    </th>
                  </tr>
                  <tr className="flex flex-col md:table-row">
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      開催頻度{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="md:w-1/3 p-3 border-r border-gray-300">
                      <select
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="frequency"
                        value={data.frequency}
                        onChange={(e) => setData("frequency", e.target.value)}
                      >
                        {frequencyOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.frequency && <div className="mt-1 text-sm text-red-600">{errors.frequency}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      曜日{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="md:w-1/3 p-3">
                      <select
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="week"
                        value={data.week}
                        onChange={(e) => setData("week", e.target.value)}
                      >
                        {weekOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      {errors.week && <div className="mt-1 text-sm text-red-600">{errors.week}</div>}
                    </th>
                  </tr>
                  <tr className="flex flex-col md:table-row">
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      開始時間{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="md:w-1/3 p-3 border-r border-gray-300">
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="start_time"
                        type="time"
                        value={data.start_time}
                        onChange={(e) => setData("start_time", e.target.value)}
                      />
                      {errors.start_time && <div className="mt-1 text-sm text-red-600">{errors.start_time}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      終了時間{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="md:w-1/3 p-3">
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="end_time"
                        type="time"
                        value={data.end_time}
                        onChange={(e) => setData("end_time", e.target.value)}
                      />
                      {errors.end_time && <div className="mt-1 text-sm text-red-600">{errors.end_time}</div>}
                    </th>
                  </tr>
                  <tr className="flex flex-col md:table-row">
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      会場{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="md:w-1/3 p-3 border-r border-gray-300">
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="place"
                        type="text"
                        value={data.place}
                        onChange={(e) => setData("place", e.target.value)}
                        placeholder="中目黒GTホール"
                      />
                      {errors.place && <div className="mt-1 text-sm text-red-600">{errors.place}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      最寄駅
                    </td>
                    <th className="md:w-1/3 p-3">
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="station"
                        type="text"
                        value={data.station}
                        onChange={(e) => setData("station", e.target.value)}
                        placeholder="Metro 日比谷線 六本木駅"
                      />
                      {errors.station && <div className="mt-1 text-sm text-red-600">{errors.station}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      会場住所{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        都道府県のみ必須
                      </span>
                    </td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <div className="flex flex-col md:flex-row gap-3">
                        <div className="md:w-1/3">
                          <select
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            name="prefecture_id"
                            value={data.prefecture_id}
                            onChange={(e) => setData("prefecture_id", e.target.value)}
                          >
                            {Object.entries(prefectures || {}).map(([id, name]) => (
                              <option key={id} value={id}>
                                {name}
                              </option>
                            ))}
                          </select>
                          {errors.prefecture_id && (
                            <div className="mt-1 text-sm text-red-600">{errors.prefecture_id}</div>
                          )}
                        </div>
                        <div className="md:w-2/3">
                          <input
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            name="address"
                            type="text"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            placeholder="目黒区中目黒1-1-1"
                            autoComplete="do-not-autofill"
                          />
                          {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address}</div>}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">レッスン代金</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <textarea
                        className="w-full rounded border border-gray-300 px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="price"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        placeholder={`1　レッスン 2,000円\n2　レッスン 3,000円`}
                      />
                      {errors.price && <div className="mt-1 text-sm text-red-600">{errors.price}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">その他詳細情報</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <textarea
                        className="w-full rounded border border-gray-300 px-3 py-2 h-64 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="details"
                        value={data.details}
                        onChange={(e) => setData("details", e.target.value)}
                        placeholder={`19:30~ パフォーマンス 3代目ポラリオンダンサーズ\n\n料理あり、乾き物あり`}
                      />
                      {errors.details && <div className="mt-1 text-sm text-red-600">{errors.details}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">レッスン情報URL</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="web"
                        type="text"
                        value={data.web}
                        onChange={(e) => setData("web", e.target.value)}
                        placeholder="https://www.facebook.com/martin"
                        autoComplete="do-not-autofill"
                      />
                      {errors.web && <div className="mt-1 text-sm text-red-600">{errors.web}</div>}
                    </th>
                  </tr>
                  <tr className="flex flex-col md:table-row">
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      問合せメールアドレス
                    </td>
                    <th className="md:w-1/3 p-3 border-r border-gray-300">
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="mail"
                        type="text"
                        value={data.mail}
                        onChange={(e) => setData("mail", e.target.value)}
                        placeholder="yamamoto-gonzares@yahoo.com"
                        autoComplete="do-not-autofill"
                      />
                      {errors.mail && <div className="mt-1 text-sm text-red-600">{errors.mail}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      問合せ電話番号
                    </td>
                    <th className="md:w-1/3 p-3">
                      <input
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        name="phone"
                        type="text"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                        placeholder="080-1234-5678"
                        autoComplete="do-not-autofill"
                      />
                      {errors.phone && <div className="mt-1 text-sm text-red-600">{errors.phone}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">イベント表示状態</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <div className="flex items-center gap-3">
                        <input
                          name="published"
                          type="checkbox"
                          value="1"
                          checked={data.published === "1"}
                          className="h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                          onChange={(e) => setData("published", e.target.checked ? "1" : "0")}
                        />
                        <span className="text-gray-700">チェックされているとイベント一覧に表示される</span>
                      </div>
                      {errors.published && <div className="mt-1 text-sm text-red-600">{errors.published}</div>}
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
            <input name="id" type="hidden" value={lesson.id} />
            <div className="text-center">
              <button
                type="submit"
                className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={processing}
              >
                レッスン内容更新
              </button>
            </div>
          </form>
        </article>
      </div>
    </AdminLayout>
  );
};

export default Edit;
