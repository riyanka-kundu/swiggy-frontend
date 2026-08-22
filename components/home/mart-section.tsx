import { Percent } from "lucide-react";

import { martProducts } from "@/data/home";

export default function MartSection() {
  return (
    <section id="mart" className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
      <div className="mb-6 flex items-end justify-between">
        <div>
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
            <Percent size={12} />
            Quick mart
          </p>

          <h2 className="text-2xl font-black md:text-3xl">
            Groceries in minutes
          </h2>
        </div>

        <button
          className="
            hidden
            text-sm
            font-semibold
            text-primary
            hover:underline
            sm:block
          "
        >
          See all
        </button>
      </div>

      <div
        className="
          flex
          snap-x
          snap-mandatory
          gap-4
          overflow-x-auto
          pb-2
          scrollbar-none
        "
      >
        {martProducts.map((item) => (
          <div
            key={item.name}
            className="
              w-36
              shrink-0
              snap-start
              rounded-xl
              border
              border-border
              bg-card
              p-4
              text-center
              transition
              hover:border-primary/40
            "
          >
            <div className="mb-3 text-4xl">{item.emoji}</div>

            <h4 className="text-sm font-semibold leading-tight">{item.name}</h4>

            <p className="mt-1 text-xs text-muted-foreground">{item.eta}</p>

            <p className="mt-2 text-sm font-bold text-primary">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
