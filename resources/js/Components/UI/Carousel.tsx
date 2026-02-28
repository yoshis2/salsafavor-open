// カルーセルコンポーネント
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay]);

type CarouselProps = {
  images: { src: string; alt?: string }[];
  interval?: number;
  loop?: boolean;
};

const Carousel: React.FC<CarouselProps> = ({ images, interval = 3000, loop = true }) => {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 rounded-lg">
        <span className="text-gray-500">画像がありません</span>
      </div>
    );
  }

  return (
    <Swiper
      autoplay={{ delay: interval, disableOnInteraction: false }}
      loop={loop}
      slidesPerView={1}
      className="w-full h-64 rounded-lg"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img.src}
            alt={img.alt || `carousel-image-${idx}`}
            className="object-cover w-full h-64 rounded-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/img/no-image.png";
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
