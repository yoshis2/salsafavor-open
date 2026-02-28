import AdminLayout from "@/Layouts/AdminLayout";
import React, { type SubmitEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import type { Genre } from "@/types/Master";

type Props = {
  genres: Genre[];
  prefectures: Record<string, string>;
};

declare function route(name: string, params?: Record<string, unknown> | number | string): string;

const Create: React.FC<Props> = ({ genres, prefectures }) => {
  const { data, setData, post, processing, errors } = useForm({
    name: "",
    files: [] as File[],
    genre_ids: [] as number[],
    event_date: "",
    start_time: "18:00",
    end_time: "23:00",
    dj: "",
    owner: "",
    place: "",
    station: "",
    prefecture_id: Object.keys(prefectures)[0] ?? "",
    address: "",
    price: "",
    lesson: "0",
    performance: "0",
    details: "",
    web: "",
    mail: "",
    phone: "",
    published: "1",
  });

  const handleGenreToggle = (id: number, checked: boolean) => {
    const next = checked
      ? Array.from(new Set([...data.genre_ids, id]))
      : data.genre_ids.filter((value) => value !== id);
    setData("genre_ids", next);
  };

  const fileError = errors.files ?? errors["files.0"];

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const url = typeof route === "function" ? route("admin.events.store") : "/admin/events";
    post(url, { forceFormData: true });
  };

  return (
    <AdminLayout>
      <div className="mx-auto w-full max-w-6xl px-4 py-6">
        <article className="w-full">
          <h1 className="mb-6 text-2xl font-bold text-gray-800">イベント情報登録</h1>
          <form onSubmit={handleSubmit} autoComplete="do-not-autofill" encType="multipart/form-data">
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse border border-gray-300">
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      イベント名{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        type="text"
                        name="name"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="ラテン サルサ フェスティバル2021"
                        autoComplete="do-not-autofill"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                      />
                      {errors.name && <div className="mt-1 text-sm text-red-600">{errors.name}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      画像（最大6枚複数選択可）
                    </td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        type="file"
                        name="files[]"
                        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
                        multiple
                        onChange={(e) => setData("files", Array.from(e.target.files ?? []))}
                      />
                      {fileError && <div className="mt-1 text-sm text-red-600">{fileError}</div>}
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
                              type="checkbox"
                              name="genre_ids[]"
                              value={genre.id}
                              className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                              checked={data.genre_ids.includes(genre.id)}
                              onChange={(e) => handleGenreToggle(genre.id, e.target.checked)}
                            />
                            <span>{genre.name}</span>
                          </label>
                        ))}
                      </div>
                      {errors.genre_ids && <div className="mt-1 text-sm text-red-600">{errors.genre_ids}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      イベント日{" "}
                      <span className="ml-2 inline-flex items-center rounded-full bg-danger px-2 py-0.5 text-xs font-semibold text-white">
                        必須
                      </span>
                    </td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        type="date"
                        name="event_date"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={data.event_date}
                        onChange={(e) => setData("event_date", e.target.value)}
                      />
                      {errors.event_date && <div className="mt-1 text-sm text-red-600">{errors.event_date}</div>}
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
                        type="time"
                        name="start_time"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                        type="time"
                        name="end_time"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        value={data.end_time}
                        onChange={(e) => setData("end_time", e.target.value)}
                      />
                      {errors.end_time && <div className="mt-1 text-sm text-red-600">{errors.end_time}</div>}
                    </th>
                  </tr>
                  <tr className="flex flex-col md:table-row">
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      DJ
                    </td>
                    <th className="md:w-1/3 p-3 border-r border-gray-300">
                      <input
                        type="text"
                        name="dj"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="ミスター 忍者"
                        value={data.dj}
                        onChange={(e) => setData("dj", e.target.value)}
                      />
                      {errors.dj && <div className="mt-1 text-sm text-red-600">{errors.dj}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      主催者
                    </td>
                    <th className="md:w-1/3 p-3">
                      <input
                        type="text"
                        name="owner"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="ウルトラ マーティン"
                        value={data.owner}
                        onChange={(e) => setData("owner", e.target.value)}
                      />
                      {errors.owner && <div className="mt-1 text-sm text-red-600">{errors.owner}</div>}
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
                        type="text"
                        name="place"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="中目黒GTホール"
                        value={data.place}
                        onChange={(e) => setData("place", e.target.value)}
                      />
                      {errors.place && <div className="mt-1 text-sm text-red-600">{errors.place}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      最寄駅
                    </td>
                    <th className="md:w-1/3 p-3">
                      <input
                        type="text"
                        name="station"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Metro 日比谷線 六本木駅"
                        autoComplete="do-not-autofill"
                        value={data.station}
                        onChange={(e) => setData("station", e.target.value)}
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
                            name="prefecture_id"
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
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
                            type="text"
                            name="address"
                            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                            placeholder="目黒区中目黒1-1-1"
                            autoComplete="do-not-autofill"
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                          />
                          {errors.address && <div className="mt-1 text-sm text-red-600">{errors.address}</div>}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">入場料金</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <textarea
                        name="price"
                        className="w-full rounded border border-gray-300 px-3 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={`レッスン込み 2,000円\nフリータイムのみ 1,500円`}
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                      />
                      {errors.price && <div className="mt-1 text-sm text-red-600">{errors.price}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">オプション</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="md:w-1/2">
                          <div className="flex gap-2">
                            <label className="flex-1 cursor-pointer">
                              <input
                                type="radio"
                                name="lesson"
                                value="0"
                                className="peer sr-only"
                                checked={data.lesson === "0"}
                                onChange={(e) => setData("lesson", e.target.value)}
                              />
                              <span className="block rounded border border-red-600 px-3 py-2 text-center text-red-700 bg-white peer-checked:bg-danger peer-checked:text-white transition-colors">
                                レッスンなし
                              </span>
                            </label>
                            <label className="flex-1 cursor-pointer">
                              <input
                                type="radio"
                                name="lesson"
                                value="1"
                                className="peer sr-only"
                                checked={data.lesson === "1"}
                                onChange={(e) => setData("lesson", e.target.value)}
                              />
                              <span className="block rounded border border-red-600 px-3 py-2 text-center text-red-700 bg-white peer-checked:bg-danger peer-checked:text-white transition-colors">
                                レッスンあり
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <div className="flex gap-2">
                            <label className="flex-1 cursor-pointer">
                              <input
                                type="radio"
                                name="performance"
                                value="0"
                                className="peer sr-only"
                                checked={data.performance === "0"}
                                onChange={(e) => setData("performance", e.target.value)}
                              />
                              <span className="block rounded border border-red-600 px-3 py-2 text-center text-red-700 bg-white peer-checked:bg-danger peer-checked:text-white transition-colors">
                                パフォーマンスなし
                              </span>
                            </label>
                            <label className="flex-1 cursor-pointer">
                              <input
                                type="radio"
                                name="performance"
                                value="1"
                                className="peer sr-only"
                                checked={data.performance === "1"}
                                onChange={(e) => setData("performance", e.target.value)}
                              />
                              <span className="block rounded border border-red-600 px-3 py-2 text-center text-red-700 bg-white peer-checked:bg-danger peer-checked:text-white transition-colors">
                                パフォーマンスあり
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                      {errors.lesson && <div className="mt-1 text-sm text-red-600">{errors.lesson}</div>}
                      {errors.performance && <div className="mt-1 text-sm text-red-600">{errors.performance}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">
                      その他詳細情報(レッスン・パフォ情報等)
                    </td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <textarea
                        name="details"
                        className="w-full rounded border border-gray-300 px-3 py-2 h-64 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder={`18:00〜18:30 サルサミニレッスン\n\n19:30〜 パフォーマンス 3代目ポラリオンダンサーズ\n\n料理あり、乾き物あり`}
                        value={data.details}
                        onChange={(e) => setData("details", e.target.value)}
                      />
                      {errors.details && <div className="mt-1 text-sm text-red-600">{errors.details}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">イベントのURL</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <input
                        type="url"
                        name="web"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="https://www.facebook.com/martin"
                        autoComplete="do-not-autofill"
                        value={data.web}
                        onChange={(e) => setData("web", e.target.value)}
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
                        type="email"
                        name="mail"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="yamamoto-gonzares@yahoo.com"
                        autoComplete="do-not-autofill"
                        value={data.mail}
                        onChange={(e) => setData("mail", e.target.value)}
                      />
                      {errors.mail && <div className="mt-1 text-sm text-red-600">{errors.mail}</div>}
                    </th>
                    <td className="md:w-1/6 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                      問合せ電話番号
                    </td>
                    <th className="md:w-1/3 p-3">
                      <input
                        type="tel"
                        name="phone"
                        className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="080-1234-5678"
                        autoComplete="do-not-autofill"
                        value={data.phone}
                        onChange={(e) => setData("phone", e.target.value)}
                      />
                      {errors.phone && <div className="mt-1 text-sm text-red-600">{errors.phone}</div>}
                    </th>
                  </tr>
                  <tr>
                    <td className="w-1/4 bg-gray-50 p-3 font-semibold border-r border-gray-300">イベント表示状態</td>
                    <th className="w-3/4 p-3" colSpan={3}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          name="published"
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

            <div className="text-center mb-6">
              <button
                type="submit"
                className="bg-danger hover:bg-red-700 text-white font-bold py-3 px-8 rounded shadow-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={processing}
              >
                イベント内容登録
              </button>
            </div>

            <div className="mt-6 flex justify-center">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded shadow-sm">
                <div className="flex items-center">
                  <i className="fas fa-info-circle text-yellow-500 mr-2"></i>
                  <p className="text-sm text-yellow-800 font-medium">
                    ※ 画像の並び順の変更や追加・削除は、登録後の編集画面から行えます。
                    <br />
                    <br />
                  </p>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-info-circle text-yellow-500 mr-2"></i>
                  <p className="text-sm text-yellow-800 font-medium">
                    ※ 終了日時が現在の時間よりも過去のイベントはイベント情報一覧には表示されません。
                  </p>
                </div>
              </div>
            </div>
          </form>
        </article>
      </div>
    </AdminLayout>
  );
};

export default Create;
