import React from "react";

type ModalProps = {
  open: boolean;
  title?: string;
  children: React.ReactNode;
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
  okButtonClass?: string;
  cancelButtonClass?: string;
  loading?: boolean;
};

export default function Modal({
  open,
  title,
  children,
  okText = "OK",
  cancelText = "キャンセル",
  onOk,
  onCancel,
  okButtonClass = "bg-danger hover:bg-red-700 text-white",
  cancelButtonClass = "bg-gray-300 hover:bg-gray-400 text-gray-800",
  loading = false,
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
        {title && <div className="px-6 py-4 border-b border-gray-200 font-bold text-lg">{title}</div>}
        <div className="px-6 py-6">{children}</div>
        <div className="px-6 py-4 flex justify-end gap-4 border-t border-gray-100">
          <button
            type="button"
            className={`px-4 py-2 rounded ${cancelButtonClass}`}
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button type="button" className={`px-4 py-2 rounded ${okButtonClass}`} onClick={onOk} disabled={loading}>
            {loading ? "処理中..." : okText}
          </button>
        </div>
      </div>
    </div>
  );
}
