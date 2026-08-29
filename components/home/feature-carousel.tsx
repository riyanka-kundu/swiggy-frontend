"use client";
import CustomCarousel from "@/components/common/custom-carousel";
import { cn } from "@/lib/utils";

import { carouselSlides } from "@/data/home";

export default function FeaturedCarousel() {
  return (
    <CustomCarousel
      items={carouselSlides}
      itemClassName="basis-full"
      renderItem={(slide) => (
        <div
          className={cn(
            "h-72",
            "md:h-96",
            "flex",
            "items-center",
            "justify-center",
            "gap-8",
            "rounded-2xl",
            "bg-linear-to-br",
            slide.gradient,
            "px-8",
            "md:px-16",
          )}
        >
          <span className="text-7xl md:text-9xl">{slide.emoji}</span>

          <div className="hidden text-left sm:block">
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-white/60">
              Chef&apos;s pick
            </p>

            <h3 className="text-2xl font-black text-white md:text-4xl">
              {slide.title}
            </h3>

            <p className="mt-2 text-white/70">{slide.subtitle}</p>
          </div>
        </div>
      )}
    />
  );
}
