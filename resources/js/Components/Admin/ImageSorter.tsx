import React from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type SortableImage = {
  id: string | number;
  url: string;
  file?: File;
  isNew: boolean;
};

type Props = {
  images: SortableImage[];
  setImages: React.Dispatch<React.SetStateAction<SortableImage[]>>;
  onReorder?: (nextImages: SortableImage[]) => void;
  onRemove?: (image: SortableImage) => Promise<void> | void;
  onUpload?: (files: File[]) => void;
  helperText?: string;
  imageClassName?: string;
  disabled?: boolean;
};

const buildTempId = (index: number) => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `temp-${Date.now()}-${index}`;
};

const isBlobUrl = (url: string) => url.startsWith("blob:");

const ImageCard: React.FC<{
  image: SortableImage;
  onRemove: (image: SortableImage) => void | Promise<void>;
  imageClassName?: string;
}> = ({ image, onRemove, imageClassName }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: image.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.7 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative">
      <button
        type="button"
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500/80 text-white shadow-md transition-all hover:bg-red-600 focus:outline-none"
        aria-label="画像を削除"
        onClick={(event) => {
          event.stopPropagation();
          onRemove(image);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
      <img src={image.url} alt="" className={imageClassName ?? "img-thumbnail image-management-width"} />
    </div>
  );
};

const ImageSorter: React.FC<Props> = ({
  images,
  setImages,
  onReorder,
  onRemove,
  onUpload,
  helperText,
  imageClassName,
  disabled,
}) => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((item) => item.id === active.id);
    const newIndex = images.findIndex((item) => item.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const nextImages = arrayMove(images, oldIndex, newIndex);
    setImages(nextImages);
    if (onReorder) {
      onReorder(nextImages);
    }
  };

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const readFiles = files.map((file, index) => {
      return new Promise<SortableImage>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            id: buildTempId(index),
            url: reader.result as string,
            file,
            isNew: true,
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readFiles).then((nextImages) => {
      setImages((prevImages) => [...prevImages, ...nextImages]);
      if (onUpload) {
        onUpload(files);
      }
    });
    event.target.value = "";
  };

  const handleRemove = async (image: SortableImage) => {
    if (image.isNew) {
      if (isBlobUrl(image.url)) {
        URL.revokeObjectURL(image.url);
      }
      setImages((prevImages) => prevImages.filter((item) => item.id !== image.id));
      return;
    }

    if (onRemove) {
      try {
        await onRemove(image);
      } catch {
        return;
      }
    }

    setImages((prevImages) => prevImages.filter((item) => item.id !== image.id));
  };

  return (
    <div className="space-y-3">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={images.map((image) => image.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} onRemove={handleRemove} imageClassName={imageClassName} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      <div className="space-y-2">
        <label className="inline-flex items-center gap-2 cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500 transition-colors shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="font-semibold">画像をアップロード / 追加</span>
          <input type="file" multiple accept="image/*" onChange={handleFilesChange} className="sr-only" />
        </label>
        <p className="text-xs text-gray-500">{helperText ?? "画像（最大6枚複数選択可）"}</p>
      </div>
    </div>
  );
};

export { ImageSorter };
export default ImageSorter;
