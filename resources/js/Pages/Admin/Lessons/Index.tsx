import { useState } from "react";
import { router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/UI/Modal";
import { FREQUENCY_LABELS, WEEK_LABELS } from "@/constants/lesson";

type Lesson = {
  id: number;
  name: string;
  frequency: string;
  week: string;
  start_time: string;
  end_time: string;
  published: boolean;
};

type Props = {
  lessons: Lesson[];
};

function formatLessonTime(value?: string) {
  if (!value) return "";
  const [h, m] = value.split(":");
  return `${h}時${m}分`;
}

export default function AdminLessonsIndex({ lessons }: Props) {
  const [deleteTarget, setDeleteTarget] = useState<Lesson | null>(null);
  const [publishTarget, setPublishTarget] = useState<Lesson | null>(null);

  return (
    <AdminLayout>
      <div className="w-full px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">レッスン情報管理</h1>
        <div className="mb-6">
          <Link
            href="/admin/lessons/create"
            className="inline-block bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-md transition-colors"
          >
            レッスン情報作成
          </Link>
        </div>
        {lessons.map((lesson) => (
          <div key={lesson.id} className="mb-8 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-gray-200">
                <tr className="flex flex-col md:table-row">
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    ﾚｯｽﾝ名
                  </td>
                  <th className="md:w-auto p-3 text-left" colSpan={5}>
                    {lesson.name}
                  </th>
                </tr>
                <tr className="flex flex-col md:table-row">
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    開催日
                  </td>
                  <th className="md:w-48 p-3 text-left border-r border-gray-300">
                    {FREQUENCY_LABELS[lesson.frequency] ?? lesson.frequency} {WEEK_LABELS[lesson.week] ?? lesson.week}{" "}
                    {formatLessonTime(lesson.start_time)} ~ {formatLessonTime(lesson.end_time)}
                  </th>
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    公開状況
                  </td>
                  <th className="md:w-36 p-3 text-center border-r border-gray-300">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded text-white font-bold text-sm transition-colors w-4/5 mx-auto block ${
                        lesson.published ? "bg-danger hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"
                      }`}
                      onClick={() => setPublishTarget(lesson)}
                    >
                      {lesson.published ? "公開中" : "非公開"}
                    </button>
                  </th>
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    処理
                  </td>
                  <th className="md:w-48 p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors w-2/5 text-center"
                        href={`/admin/lessons/${lesson.id}`}
                      >
                        修正
                      </Link>
                      <button
                        type="button"
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors w-2/5 text-center"
                        onClick={() => setDeleteTarget(lesson)}
                      >
                        削除
                      </button>
                    </div>
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
      {/* 公開モーダル */}
      <Modal
        open={!!publishTarget}
        title="公開ステータス変更"
        okText={publishTarget?.published ? "非公開にする" : "公開にする"}
        cancelText="キャンセル"
        onOk={() => {
          if (publishTarget) {
            router.patch(
              `/admin/lessons/${publishTarget.id}`,
              { published: !publishTarget.published },
              {
                onFinish: () => setPublishTarget(null),
              },
            );
          }
        }}
        onCancel={() => setPublishTarget(null)}
      >
        <div className="text-gray-700">
          {publishTarget?.published
            ? "このレッスンを非公開にします。よろしいですか？"
            : "このレッスンを公開します。よろしいですか？"}
        </div>
      </Modal>
      {/* 削除モーダル */}
      <Modal
        open={!!deleteTarget}
        title="レッスン削除"
        okText="削除する"
        cancelText="キャンセル"
        okButtonClass="bg-danger hover:bg-red-700 text-white"
        onOk={() => {
          if (deleteTarget) {
            router.delete(`/admin/lessons/${deleteTarget.id}`, {
              onFinish: () => setDeleteTarget(null),
            });
          }
        }}
        onCancel={() => setDeleteTarget(null)}
      >
        <div className="text-gray-700">本当に「{deleteTarget?.name}」を削除しますか？この操作は元に戻せません。</div>
      </Modal>
    </AdminLayout>
  );
}
