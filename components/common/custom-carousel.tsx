"use client";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CustomCarouselProps<T> = {
  items: T[];

  renderItem: (item: T, index: number) => React.ReactNode;

  autoplay?: boolean;

  className?: string;

  itemClassName?: string;
};

export default function CustomCarousel<T>({
  items,
  renderItem,
  autoplay = true,
  className = "",
  itemClassName = "",
}: CustomCarouselProps<T>) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 4000,
              }),
            ]
          : []
      }
      className={className}
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className={itemClassName}>
            {renderItem(item, index)}
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}
