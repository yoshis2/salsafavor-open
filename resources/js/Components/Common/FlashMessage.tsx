import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

type FlashData = {
  success?: string;
  error?: string;
  warning?: string;
  message?: string;
};

type PageProps = {
  flash: FlashData;
};

type FlashItem = {
  text: string;
  type: "success" | "error" | "warning" | "info";
};

const ALERT_STYLES: Record<FlashItem["type"], string> = {
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
  success: "bg-green-100 border-green-400 text-green-700",
};

function extractFlashItems(flash: FlashData | undefined): FlashItem[] {
  if (!flash) return [];
  const items: FlashItem[] = [];
  if (flash.success) items.push({ text: flash.success, type: "success" });
  if (flash.error) items.push({ text: flash.error, type: "error" });
  if (flash.warning) items.push({ text: flash.warning, type: "warning" });
  if (flash.message) items.push({ text: flash.message, type: "info" });
  return items;
}

export default function FlashMessage() {
  const { flash } = usePage<PageProps>().props;
  const [items, setItems] = useState<FlashItem[]>([]);

  useEffect(() => {
    const next = extractFlashItems(flash);
    setItems(next);
  }, [flash]);

  const dismiss = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  if (items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 max-w-7xl mt-4 space-y-2">
      {items.map((item, index) => (
        <div
          key={`${item.type}-${index}`}
          className={`border px-4 py-3 rounded relative ${ALERT_STYLES[item.type]}`}
          role="alert"
        >
          <span className="block sm:inline">{item.text}</span>
          <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => dismiss(index)}>
            <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
