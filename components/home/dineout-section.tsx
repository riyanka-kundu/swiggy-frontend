import { MapPinned, Star } from "lucide-react";

import { dineOutSpots } from "@/data/home";

export default function DineOutSection() {
  return (
    <section id="dineout" className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
      <div className="mb-6">
        <p
          className="
            mb-2
            flex
            items-center
            gap-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-primary
          "
        >
          <MapPinned size={12} />
          Dine out
        </p>

        <h2 className="text-2xl font-black md:text-3xl">Book a table nearby</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {dineOutSpots.map((spot) => (
          <div
            key={spot.name}
            className="
              flex
              gap-4
              rounded-xl
              border
              border-border
              bg-card
              p-4
              transition
              hover:border-primary/40
            "
          >
            {/* Image */}
            <div
              className="
                flex
                h-20
                w-20
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-[#F0E4CE]
                text-4xl
              "
            >
              {spot.emoji}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <h4 className="truncate font-bold">{spot.name}</h4>

                <span
                  className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                    rounded-full
                    bg-[#1a1410]
                    px-2
                    py-1
                    text-xs
                    font-semibold
                    text-white
                  "
                >
                  <Star size={10} className="fill-primary text-primary" />

                  {spot.rating}
                </span>
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {spot.cuisine}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {spot.distance} away
                </span>

                {spot.offer && (
                  <span className="text-xs font-semibold text-primary">
                    {spot.offer}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
