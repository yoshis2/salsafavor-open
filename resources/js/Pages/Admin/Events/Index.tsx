import { useState } from "react";
import { router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Modal from "@/Components/UI/Modal";

type Event = {
  id: number;
  name: string;
  start_datetime: string;
  published: boolean;
};

type Props = {
  events: Event[];
};

function formatDateTime(dt: string) {
  const d = new Date(dt);
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分`;
}

export default function AdminEventsIndex({ events }: Props) {
  const [deleteTarget, setDeleteTarget] = useState<Event | null>(null);
  const [publishTarget, setPublishTarget] = useState<Event | null>(null);

  return (
    <AdminLayout>
      <div className="w-full px-4 py-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">イベント情報管理</h1>
        <div className="mb-6">
          <Link
            href="/admin/events/create"
            className="inline-block bg-danger hover:bg-red-700 text-white font-bold py-3 px-6 rounded shadow-md transition-colors"
          >
            イベント情報作成
          </Link>
        </div>
        {events.map((event) => (
          <div key={event.id} className="mb-8 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
            <table className="w-full border-collapse">
              <tbody className="divide-y divide-gray-200">
                <tr className="flex flex-col md:table-row">
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    ｲﾍﾞﾝﾄ名
                  </td>
                  <th className="md:w-auto p-3 text-left" colSpan={5}>
                    {event.name}
                  </th>
                </tr>
                <tr className="flex flex-col md:table-row">
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    開始日時
                  </td>
                  <th className="md:w-48 p-3 text-left border-r border-gray-300">
                    {formatDateTime(event.start_datetime)}
                  </th>
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    公開状況
                  </td>
                  <th className="md:w-36 p-3 text-center border-r border-gray-300">
                    <button
                      type="button"
                      className={`px-4 py-2 rounded text-white font-bold text-sm transition-colors w-4/5 mx-auto block ${
                        event.published ? "bg-danger hover:bg-red-700" : "bg-gray-500 hover:bg-gray-600"
                      }`}
                      onClick={() => setPublishTarget(event)}
                    >
                      {event.published ? "公開中" : "非公開"}
                    </button>
                  </th>
                  <td className="md:w-24 bg-gray-50 p-3 font-semibold border-r border-gray-300 border-b md:border-b-0">
                    処理
                  </td>
                  <th className="md:w-48 p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors w-2/5 text-center"
                        href={`/admin/events/${event.id}`}
                      >
                        修正
                      </Link>
                      <button
                        type="button"
                        className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors w-2/5 text-center"
                        onClick={() => setDeleteTarget(event)}
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
              `/admin/events/${publishTarget.id}`,
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
            ? "このイベントを非公開にします。よろしいですか？"
            : "このイベントを公開します。よろしいですか？"}
        </div>
      </Modal>
      {/* 削除モーダル */}
      <Modal
        open={!!deleteTarget}
        title="イベント削除"
        okText="削除する"
        cancelText="キャンセル"
        okButtonClass="bg-danger hover:bg-red-700 text-white"
        onOk={() => {
          if (deleteTarget) {
            router.delete(`/admin/events/${deleteTarget.id}`, {
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
